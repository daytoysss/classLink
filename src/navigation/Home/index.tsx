import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParams } from '../../types/DrawerParams';
import MainStack from './MainStack';
import DrawerContent from './DrawerContent';
import Appointment from '../../screens/Appointment';

const Drawer = createDrawerNavigator<DrawerParams>();

export default function Home() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={MainStack} />
      <Drawer.Screen name="Appointment" component={Appointment} />
    </Drawer.Navigator>
  );
}
