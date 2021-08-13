import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch } from '../../redux-toolkit/hook';
import { setLoginState } from '../../redux-toolkit/authSlice';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen: React.FC<any> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const RootNavigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.getAllKeys().then(key => AsyncStorage.multiRemove(key));
    dispatch(setLoginState(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => RootNavigation.dispatch(DrawerActions.closeDrawer())}
        style={styles.closeSection}>
        <AntDesign name="close" style={styles.buttonClose} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.dispatch(DrawerActions.closeDrawer());
          RootNavigation.navigate('Main', {
            screen: 'Tabbar',
            params: {
              screen: 'Home',
            },
          });
        }}>
        <Text style={styles.buttonName}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.dispatch(DrawerActions.closeDrawer());
          RootNavigation.navigate('Appointment');
        }}
        style={{ alignItems: 'center' }}>
        <Text style={styles.buttonName}>View</Text>
        <Text style={styles.buttonName}>Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.buttonName}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pinkBgc,
    padding: 20,
    paddingBottom: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeSection: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  buttonClose: {
    fontSize: 30,
    marginVertical: 20,
  },
  buttonName: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});

export default Screen;
