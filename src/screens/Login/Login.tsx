import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/hook';
import { RootStackParamList } from '../../types/RootStackParams';
import { baseURL, colors } from '../../utils/constants';

type LoginPropType = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.role.role)
  const handleLogin = async () => {
    console.log(username, password)
    try {
      const res = await axios.post(`${baseURL}api/auth/${role === 'teacher' ? 'loginAdmin' : 'login'}`, {
        username,
        password,
      })
      if (res.data.status === 'failed') {
        Alert.alert('ClassLink', res.data.message)
      } else {
        dispatch(setLoginState(true));
      }
    } catch (err) {
      console.log(err)
    }
    // dispatch(setLoginState(true));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title}>ClassLink</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
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
