import React from 'react';
import {Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const UserScreen = () => {
  return (
    <SafeAreaView forceInset={{top: 'never'}}>
      <View>
        <Text>User</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
