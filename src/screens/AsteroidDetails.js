import React from 'react';
import {Container, Content, CardItem, Body, Card, Text} from 'native-base';
import {StyleSheet} from 'react-native';

const AsteroidDetails = ({route}) => {
  const {
    name,
    nasa_jpl_url,
    is_potentially_hazardous_asteroid,
  } = route.params.asteroid;

  console.log(
    'NY_LOG',
    route.params.asteroid.is_potentially_hazardous_asteroid,
  );
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.label}>
                Name: <Text style={styles.value}>{name}</Text>
              </Text>
              <Text style={styles.label}>
                Nasa Jpl Url: <Text style={styles.value}>{nasa_jpl_url}</Text>
              </Text>
              <Text style={styles.label}>
                Is Potentially Hazardous Asteroid:
                <Text style={styles.value}>
                  {` ${is_potentially_hazardous_asteroid.toString()}`}
                </Text>
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default AsteroidDetails;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5%',
  },
  label: {marginBottom: '2%'},
  value: {fontWeight: 'bold'},
});
