import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { TabParams } from '../../types/TabParams';
import { colors } from '../../utils/constants';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="ClassLink" isBackable={false}/>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() =>
          RootNavigation.navigate('Main', {
            screen: 'CreateClass',
          })
        }>
        <Text style={[styles.text, { fontSize: 80 }]}>+</Text>
        <Text style={[styles.text, { fontSize: 40 }]}>New class</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.homeBgc,
    flex: 1,
  },
  buttonCreate: {
    backgroundColor: colors.buttonNewClass,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.black,
    marginHorizontal: 50,
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});

export default HomeScreen;
