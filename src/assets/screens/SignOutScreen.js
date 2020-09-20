import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import {types} from '../redux/types';
import {appStyle} from '../assets/styles/app';

const SignOutScreen = (props) => {
  useEffect(() => {
    props.dispatch({type: types.LOGOUT});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={[appStyle.panSafeArea, appStyle.panCenter]}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
};

export default connect(null)(SignOutScreen);
