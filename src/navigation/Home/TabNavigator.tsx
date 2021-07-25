import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';
import HomeScreen from '../../screens/HomeScreen';
import Booking from '../../screens/Booking';
import Classroom from '../../screens/Classroom';
import Summary from '../../screens/Summary';
import { View, TouchableOpacity, Text } from 'react-native';

const BottomTab = createBottomTabNavigator<TabParams>();

const CustomTabbar = ({ state, descriptors, navigation }) => {
  console.log(state, descriptors);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      {state.routes.map((route: any, index: number) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route.name)}
          key={route.key}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function Home() {
  return (
    <BottomTab.Navigator tabBar={props => <CustomTabbar {...(props as any)} />}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Booking" component={Booking} />
      <BottomTab.Screen name="Classroom" component={Classroom} />
      <BottomTab.Screen name="Summary" component={Summary} />
    </BottomTab.Navigator>
  );
}
