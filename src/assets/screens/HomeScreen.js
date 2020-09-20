import React from 'react';
import {Appbar} from 'react-native-paper';
import {appStyle} from '../assets/styles/app';
import * as navigation from '../navigator/RootNavigation';
import SafeAreaView from 'react-native-safe-area-view';

const HomeScreen = () => {
  const _openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={_openDrawer} />
        <Appbar.Content title={'Home'} subtitle={'Welcome'} />
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default HomeScreen;
