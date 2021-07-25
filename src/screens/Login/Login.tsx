import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { setLoginState } from '../../redux-toolkit/authSlice';
import { useAppDispatch } from '../../redux-toolkit/hook';
import { RootStackParamList } from '../../types/RootStackParams';
import { colors } from '../../utils/constants';

type LoginPropType = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    dispatch(setLoginState(true));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title}>ClassLink</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 50,
    color: colors.title,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: {
    alignSelf: 'flex-start',
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1,
    width: Dimensions.get('screen').width - 100,
    marginTop: 5,
    marginBottom: 10,
  },
  loginBtn: {
    marginTop: 20,
    alignSelf: 'flex-end',
    height: 50,
    backgroundColor: colors.buttonLoginBgc,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  loginText: {
    color: colors.white,
  },
});

export default Screen;
