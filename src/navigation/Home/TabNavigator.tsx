import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';
import HomeScreen from '../../screens/HomeScreen';
import Booking from '../../screens/Booking';
import Classroom from '../../screens/Classroom';
import Summary from '../../screens/Summary';
import CustomTabbar from '../../components/CustomTabBar';
import Message from '../../screens/Message';

const BottomTab = createBottomTabNavigator<TabParams>();

export default function Home() {
  return (
    <BottomTab.Navigator tabBar={props => <CustomTabbar {...(props as any)} />}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Classroom" component={Classroom} />
      <BottomTab.Screen name="Message" component={Message} />
      <BottomTab.Screen name="Booking" component={Booking} />
      <BottomTab.Screen name="Summary" component={Summary} />
    </BottomTab.Navigator>
  );
}
