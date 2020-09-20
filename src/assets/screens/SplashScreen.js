import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ActivityIndicator, StatusBar} from 'react-native';
import {appStyle} from '../assets/styles/app';

const SplashScreen = () => {
  return (
    <SafeAreaView style={[appStyle.panSafeArea, appStyle.panCenter]}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
};

export default SplashScreen;
