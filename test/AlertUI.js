import React from 'react';
import {Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const AlertUI = props => {
  return (
    <SafeAreaView forceInset={{top: 'never'}}>
      <View>
        <Text>AlertUI</Text>
      </View>
    </SafeAreaView>
  );
};

export default AlertUI;
