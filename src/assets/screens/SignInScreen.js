import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import SignInForm from '../forms/SignInForm';
import {appStyle} from '../assets/styles/app';
import {formStyle} from '../assets/styles/form';
import SafeAreaView from 'react-native-safe-area-view';
import {Appbar} from 'react-native-paper';

const SignInScreen = ({navigation}) => {
  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={appStyle.panKeyboard}>
        <View style={appStyle.panMain}>
          <View style={formStyle.panContainer}>
            <SignInForm navigation={navigation} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
