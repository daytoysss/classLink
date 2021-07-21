import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import TabNavigator from './TabNavigator';
import Setting from '../../screens/Setting';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';

type Props = {
  navigation: BottomTabNavigationProp<TabParams>;
};

const HomeStack = createStackNavigator<HomeStackParamsList>();

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Tabbar" component={TabNavigator} />
      <HomeStack.Screen name="Setting" component={Setting} />
    </HomeStack.Navigator>
  );
};

export default Home;
