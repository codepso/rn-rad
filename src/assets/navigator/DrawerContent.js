import React from 'react';
import {View} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {connect} from 'react-redux';
import {drawerStyle} from '../assets/styles/drawer';
import * as navigation from '../navigator/RootNavigation';

const DrawerContent = () => {
  return (
    <DrawerContentScrollView>
      <View style={drawerStyle.panContent}>
        <Drawer.Section style={drawerStyle.panSection}>
          <DrawerItem
            label={'Home'}
            onPress={() => navigation.navigate('Home')}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            label={'Logout'}
            onPress={() => navigation.navigate('SignOut')}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default connect(null)(DrawerContent);
