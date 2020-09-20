import {StyleSheet} from 'react-native';

const appStyle = StyleSheet.create({
  panSafeArea: {
    flex: 1,
  },
  panKeyboard2: {
    flexGrow: 1,
  },
  panKeyboard: {
    flex: 1,
  },
  panMain: {
    flex: 1,
    justifyContent: 'center',
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
  },
  txtLogo: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  setRight: {
    alignItems: 'flex-end',
  },
  setCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnMain: {
    borderRadius: 15,
  },
  txtBold: {
    fontWeight: 'bold',
  },
  mrg20TB: {
    marginTop: 20,
    marginBottom: 20,
  },
  mrg20B: {
    marginBottom: 20,
  },
  mrg10T: {
    marginTop: 10,
  },
  mrg10TB: {
    marginTop: 10,
    marginBottom: 10,
  },
  mrg30B: {
    marginBottom: 30,
  }
});

export {appStyle};
