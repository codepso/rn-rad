import {StyleSheet} from 'react-native';
import {formStyle} from './form';
import {uiColors} from '../../themes';

const appStyle = StyleSheet.create({
  panSafeArea: {
    flex: 1,
    backgroundColor: uiColors.bg.app,
  },
  panKeyboard: {
    flexGrow: 1,
  },
  panMain: {
    backgroundColor: uiColors.bg.app,
    flex: 1,
    justifyContent: 'center',
  },
  btnClose: {
    backgroundColor: '#3b5470',
  },
  btnSuccess: {
    backgroundColor: uiColors.bg.success,
  },
  panCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWelcome: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  panLogo: {
    marginTop: 20,
    alignItems: 'center',
  },
  imgLogo: {
    resizeMode: 'contain',
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: uiColors.txt.app,
  },
  txtLogo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: uiColors.txt.logo,
  },
  setRight: {
    alignItems: 'flex-end',
  },
  setCenter: {
    alignSelf: 'center',
  },
  panLogin: {
    marginTop: 30,
    marginBottom: 10,
  },
  txtOverlay: {
    color: uiColors.txt.overlay,
  },
  btnMain: {
    borderRadius: 15,
  },
});

export {appStyle, formStyle};
