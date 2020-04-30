import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import {WHITE} from '../utils/colors';
import {BORDER_RADIUS} from '../utils/constants';
import {COUNTRY_LIST_API, NASA_API} from '../utils/apiUrls';

const HomeScreen = ({navigation}) => {
  const [asteroidID, setAsteroidID] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const getAsteroidDetails = async ({asteroidID}) => {
    setError(undefined);
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=EGcxkzubRkK6bUUy91R2y3hKO0OCQn43Q4ujDu5L`,
    )
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        console.log('JSON', json);
        if (json.status === 404) {
          throw new error();
        }
        navigation.navigate('AsteroidDetails', {asteroid: json});
      })
      .catch((error) => {
        setIsLoading(false);

        console.warn('error', error);
        setError('No Record Found');
      });
  };

  const getRandomAsteroid = async () => {
    setError(undefined);
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=EGcxkzubRkK6bUUy91R2y3hKO0OCQn43Q4ujDu5L`,
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('JSON', Array.from(json.near_earth_objects).length);
        const asteroidArray = Array.from(json.near_earth_objects);
        const randomIndex = Math.floor(Math.random() * 19);
        const asteroidID = asteroidArray[randomIndex].id;
        getAsteroidDetails({asteroidID});
      })
      .catch((error) => {
        setIsLoading(false);
        console.warn('error', error);
        setError('Something went wrong');
      });
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Form>
          <Item floatingLabel>
            <Label>Enter Asteroid' ID</Label>
            <Input value={asteroidID} onChangeText={setAsteroidID} />
          </Item>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {!isLoading ? (
            <Button
              disabled={!asteroidID}
              style={styles.btn}
              onPress={() => getAsteroidDetails({asteroidID})}>
              <Text style={styles.btnText}>SUBMIT</Text>
            </Button>
          ) : (
            <ActivityIndicator style={styles.loader} size="large" />
          )}
          <Button
            style={[styles.btn, {marginTop: '5%'}]}
            onPress={getRandomAsteroid}>
            <Text style={styles.btnText}>Random Asteroid</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5%',
  },
  btn: {
    borderRadius: BORDER_RADIUS,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  loader: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  btnText: {
    color: 'white',
  },
  errorText: {
    alignSelf: 'center',
    marginTop: '15%',
    fontSize: 24,
  },
  note: {
    marginLeft: 15,
    marginTop: 7,
  },
});
