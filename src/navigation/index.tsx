import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParams';
import Home from './Home';
import Login from '../screens/Login';
import { useAppSelector } from '../redux-toolkit/hook';
const RootStack = createStackNavigator<RootStackParamList>();

export default function AppRoute() {
  const loggedIn = useAppSelector(state => state.auth.authenticated);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loggedIn ? (
        <RootStack.Screen name="HomeStack" component={Home} />
      ) : (
        <RootStack.Screen name="Login" component={Login} />
      )}
    </RootStack.Navigator>
  );
}
