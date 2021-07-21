import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text, Touchable, TouchableOpacity } from 'react-native';
import { HomeStackParamsList } from '../../types/HomeParamsList';

type HomeStackProps = StackNavigationProp<HomeStackParamsList, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        <Text>Go Setting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
