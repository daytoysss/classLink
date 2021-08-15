import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
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
import { setUser } from '../../redux-toolkit/userSlice';
import { RootStackParamList } from '../../types/RootStackParams';
import { baseURL, colors } from '../../utils/constants';

type LoginPropType = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.role.role);
  const handleLogin = async () => {
    setLoading(true);
    console.log(username, password);
    try {
      const res = await axios.post(
        `${baseURL}auth/${role === 'teacher' ? 'loginAdmin' : 'login'}`,
        {
          username,
          password,
        },
      );
      if (res.data.status === 'failed') {
        Alert.alert('ClassLink', res.data.message);
      } else {
        const access_token = res.data.data.access_token;
        axios.defaults.headers['Authorization'] = 'Bearer ' + access_token;
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.data));
        dispatch(setUser(res.data.data));
        dispatch(setLoginState(true));
      }
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>ClassLink</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder="Username"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size={20} color="black" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 50,
    color: colors.title,
    fontFamily: 'sans-serif-condensed',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    width: Dimensions.get('screen').width - 100,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
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
