import {StyleSheet} from 'react-native';
import {uiColors} from '../../themes';

const formStyle = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 55,
    borderColor: uiColors.brd.input,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: uiColors.bg.input,
    color: uiColors.txt.input,
  },
  error: {
    fontSize: 13,
    paddingLeft: 15,
    color: uiColors.txt.error,
    marginBottom: 6,
    height: 16,
  },
  button: {
    marginTop: 10,
    padding: 5,
    backgroundColor: uiColors.bg.button,
    borderRadius: 10,
    height: 55,
  },
  txtButton: {
    color: uiColors.txt.button,
  },
  txtSection: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export {formStyle};
