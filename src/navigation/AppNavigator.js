import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

import AsteroidDetails from '../screens/AsteroidDetails';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="AsteroidDetails"
          component={AsteroidDetails}
          options={{
            title: 'Asteroid Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
