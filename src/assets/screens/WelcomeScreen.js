import React from 'react';
import {Image, View} from 'react-native';
import {Title} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../assets/styles/app';
import {Button} from 'react-native-paper';

const WelcomeScreen = (props) => {
  const {navigation} = props;
  const logoPath = require('../assets/images/logo.png');

  return (
    <SafeAreaView style={[appStyle.panSafeArea]}>
      <View style={{flex: 1}}>
        <View style={appStyle.panLogo}>
          <Image source={logoPath} style={appStyle.imgLogo} />
          <Title style={appStyle.txtLogo}>React Native</Title>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}} />
      <View style={{height: 120, width: 200, alignSelf: 'center'}}>
        <Button
          mode="contained"
          contentStyle={{height: 45}}
          onPress={() => navigation.navigate('SignIn')}>
          SIGN IN
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
