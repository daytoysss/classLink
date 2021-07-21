import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';
import HomeScreen from '../../screens/HomeScreen';
import Booking from '../../screens/Booking';
import Classroom from '../../screens/Classroom';
import Summary from '../../screens/Summary';

const BottomTab = createBottomTabNavigator<TabParams>();

export default function Home() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Booking" component={Booking} />
      <BottomTab.Screen name="Classroom" component={Classroom} />
      <BottomTab.Screen name="Summary" component={Summary} />
    </BottomTab.Navigator>
  );
}
