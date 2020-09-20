import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import {keys, pick} from 'lodash';
import {connect} from 'react-redux';
import {formState} from './state';
import {appStyle} from '../assets/styles/app';
import {formStyle} from '../assets/styles/form';
import {signInStyle} from '../assets/styles/sign-in';
import {setAuthUser} from '../redux/actions/user';
import {coreState} from '../redux/state';

const SignInForm = (props) => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Enter your email'),
    password: Yup.string()
      .required('Enter your password')
      .min(8, 'Min 8 characters'),
  });

  const initialValues = {...formState.signIn};

  const onSend = async () => {
    try {
      const accessToken = 'ad345mubafvqwZ';
      let user = {
        name: 'Juan Minaya',
        email: 'minayaleon@gmail.com',
      };
      user = pick(user, keys(coreState.user));
      const payload = {...user, accessToken};
      props.dispatch(setAuthUser(payload));
    } catch (error) {
      // Error
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <>
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>Sign In</Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={'Email'}
              value={propsForm.values.email}
              autoCapitalize={'none'}
              onChangeText={propsForm.handleChange('email')}
              onBlur={propsForm.handleBlur('email')}
              autoFocus={true}
              keyboardType={'email-address'}
            />
            <HelperText type="error">
              {propsForm.touched.email && propsForm.errors.email}
            </HelperText>
            <TextInput
              mode={'outlined'}
              secureTextEntry={true}
              placeholder={'Password'}
              value={propsForm.values.password}
              onChangeText={propsForm.handleChange('password')}
              onBlur={propsForm.handleBlur('password')}
            />
            <View style={signInStyle.cntPassword}>
              <View style={signInStyle.cntPasswordItem}>
                <HelperText type="error">
                  {propsForm.touched.password && propsForm.errors.password}
                </HelperText>
              </View>
            </View>
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              LOGIN
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default connect(null)(SignInForm);
