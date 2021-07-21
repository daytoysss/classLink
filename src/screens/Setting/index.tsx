import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { HomeStackParamsList } from '../../types/HomeParamsList';

type SettingStackProps = StackNavigationProp<HomeStackParamsList, 'Setting'>;

type Props = {
  navigation: SettingStackProps;
};

const Setting: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Setting</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>Go Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setting;
