import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppRoute from './src/navigation';
import {store} from './src/redux-toolkit/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
    </Provider>
  );
}
