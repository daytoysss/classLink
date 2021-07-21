import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { TabParams } from '../../types/TabParams';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.dispatch(DrawerActions.openDrawer());
        }}>
        <Text>Go Setting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
