import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from './DrawerContent';
import SignOutScreen from '../screens/SignOutScreen';

const HomeDrawer = createDrawerNavigator();

const MainNavigator = () => (
  <HomeDrawer.Navigator
    initialRouteName="Home"
    drawerContent={() => <DrawerContent />}>
    <HomeDrawer.Screen name="Home" component={HomeScreen} />
    <HomeDrawer.Screen name="SignOut" component={SignOutScreen} />
  </HomeDrawer.Navigator>
);

export default MainNavigator;
