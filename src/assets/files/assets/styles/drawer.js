import {StyleSheet} from 'react-native';

const drawerStyle = StyleSheet.create({
  panContent: {
    flex: 1,
  },
  panUserInfo: {
    paddingLeft: 20,
  },
  txtTitle: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  txtSubtitle: {
    fontSize: 14,
    lineHeight: 14,
  },
  panRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  panSection: {
    marginTop: 15,
  },
  panPreference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export {drawerStyle};
