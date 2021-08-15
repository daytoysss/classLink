import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../redux-toolkit/hook';
import { setLoginState } from '../../redux-toolkit/authSlice';

type Props = {
  navigation?: any;
  title: string;
  isBackable: boolean;
  rightButtonTitle?: string;
};

const Header: React.FC<Props> = ({
  navigation,
  title,
  isBackable,
  rightButtonTitle,
}) => {
  const dispatch = useAppDispatch();
  const RootNavigation = useNavigation();
  const handleLogout = async () => {
    Alert.alert('ClassLink', 'Are you sure to log out?', [
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.getAllKeys().then(key =>
            AsyncStorage.multiRemove(key),
          );
          dispatch(setLoginState(false));
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isBackable ? (
        <TouchableOpacity
          onPress={() => {
            navigation ? navigation.goBack() : RootNavigation.goBack();
          }}
          style={styles.button}>
          <Feather name="arrow-left" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {rightButtonTitle === 'Log Out' && (
        <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
          <AntDesign name="logout" style={styles.icon} />
        </TouchableOpacity>
      )}
      {rightButtonTitle === 'My Meeting' && (
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate('Appointment');
          }}
          style={styles.buttonRight}>
          <Text>{rightButtonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.title,
    fontFamily: 'sans-serif-condensed',
  },
  button: {
    position: 'absolute',
    left: 10,
    top: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonLogout: {
    position: 'absolute',
    right: 10,
    top: 5,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonRight: {
    position: 'absolute',
    right: 10,
    top: 5,
    maxWidth: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default Header;
