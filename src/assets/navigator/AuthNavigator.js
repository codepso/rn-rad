import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Welcome">
    <AuthStack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default AuthNavigator;
