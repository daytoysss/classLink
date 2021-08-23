import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useAppDispatch } from '../../redux-toolkit/hook';
import { setRole } from '../../redux-toolkit/roleSlice';
import { RootStackParamList } from '../../types/RootStackParams';
import { colors } from '../../utils/constants';

type StartScreenPropType = StackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={[styles.title, { marginBottom: 100 }]}>Class Link</Text>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => {
          dispatch(setRole('teacher'));
          navigation.navigate('Login');
        }}>
        <Text>I am a teacher</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => {
          dispatch(setRole('parent'));
          navigation.navigate('Login');
        }}>
        <Text>I am a parent</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.homeBgc,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 50,
    color: colors.white,
  },
  buttonText: {
    width: Dimensions.get('screen').width - 100,
    marginHorizontal: 50,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
  },
});

export default Screen;
