import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParams';
import Home from './Home';
import Login from '../screens/Login';
import StartScreen from '../screens/StartScreen';
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hook';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux-toolkit/userSlice';
import { setLoginState } from '../redux-toolkit/authSlice';
import axios from 'axios';
import { baseURL } from '../utils/constants';
import { setRole } from '../redux-toolkit/roleSlice';
const RootStack = createStackNavigator<RootStackParamList>();

export default function AppRoute() {
  const loggedIn = useAppSelector(state => state.auth.authenticated);
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userInfo = JSON.parse(data);
        axios.defaults.headers['Authorization'] =
          'Bearer ' + userInfo.access_token;
        const role = await axios.get(baseURL + 'users/' + userInfo.user_id);
        dispatch(setRole(role.data));
        dispatch(setUser(userInfo));
        dispatch(setLoginState(true));
        setFirstLoad(false);
      } else {
        setFirstLoad(false);
      }
    })();
  }, []);

  if (firstLoad) return null;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loggedIn ? (
        <RootStack.Screen name="HomeStack" component={Home} />
      ) : (
        <>
          <RootStack.Screen name="StartScreen" component={StartScreen} />
          <RootStack.Screen name="Login" component={Login} />
        </>
      )}
    </RootStack.Navigator>
  );
}
