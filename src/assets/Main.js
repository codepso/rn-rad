import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './navigator/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigator/RootNavigation';

const Main = () => {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
