import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import TabNavigator from './TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParams } from '../../types/TabParams';
import CreateClass from '../../screens/CreateClass';
import ClassDetail from '../../screens/ClassDetail';
import Homework from '../../screens/Homework';
import CreateHomework from '../../screens/CreateHomework';
import Report from '../../screens/Report';
import EventDetail from '../../screens/EventDetail';
import MessageDetail from '../../screens/MessageDetail';

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
      <HomeStack.Screen name="CreateClass" component={CreateClass} />
      <HomeStack.Screen name="ClassDetail" component={ClassDetail} />
      <HomeStack.Screen name="Homework" component={Homework} />
      <HomeStack.Screen name="CreateHomework" component={CreateHomework} />
      <HomeStack.Screen name="Report" component={Report} />
      <HomeStack.Screen name="EventDetail" component={EventDetail} />
      <HomeStack.Screen name="MessageDetail" component={MessageDetail} />
    </HomeStack.Navigator>
  );
};

export default Home;
