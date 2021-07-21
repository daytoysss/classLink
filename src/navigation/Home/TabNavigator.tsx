import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';

const BottomTab = createBottomTabNavigator<TabParams>();

export default function Home() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
    </BottomTab.Navigator>
  );
}
