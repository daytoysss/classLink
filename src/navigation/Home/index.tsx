import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import TabNavigator from './TabNavigator';
import Setting from '../../screens/Setting';
import { useEffect } from 'react';
import { Alert, View, Text, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParams } from '../../types/DrawerParams';
import { TouchableOpacity } from 'react-native';

const HomeStack = createStackNavigator<HomeStackParamsList>();

const Drawer = createDrawerNavigator<DrawerParams>();

function DrawerContent(props) {
  const { navigation } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
      }}>
      <Text>Drawer</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
        }}>
        <Text>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function Temp({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Tabbar" component={TabNavigator} />
      <HomeStack.Screen name="Setting" component={Setting} />
    </HomeStack.Navigator>
  );
}

export default function Home() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={Temp} />
    </Drawer.Navigator>
  );
}
