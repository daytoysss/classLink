import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { baseURL } from '../utils/constants';

type Props = {
  navigation: any;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const getData = async () => {
    try {
      const res = await axios.get(baseURL + '/api/grades')
      console.log(res)
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response))
    }
  }
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text>hi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Screen;
