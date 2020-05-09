import React from 'react';
import {Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const UserScreenScreen = () => {
  return (
    <SafeAreaView forceInset={{top: 'never'}}>
      <View>
        <Text>UserScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserScreenScreen;
