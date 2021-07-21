import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { RootStackParamList } from '../types/RootStackParams';
import Home from './Home'
const RootStack = createStackNavigator<RootStackParamList>()

export default function AppRoute() {
  return (
    <RootStack.Navigator 
    screenOptions={{
        headerShown: false,
    }}>
      <RootStack.Screen name="HomeStack" component={Home} />
    </RootStack.Navigator>
  );
};
