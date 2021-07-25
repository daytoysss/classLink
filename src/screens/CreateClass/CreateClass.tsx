import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { colors } from '../../utils/constants';

type CreateClassPropType = StackNavigationProp<
  HomeStackParamsList,
  'CreateClass'
>;

type Props = {
  navigation: CreateClassPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Create new Class"
        isBackable={true}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Class Name</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Grade</Text>
        <TextInput style={styles.input} />
        <View style={styles.btnContainer}>
          <Button title="Add" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: { marginTop: 150, paddingHorizontal: 50 },
  input: {
    borderColor: colors.black,
    borderWidth: 1,
    width: Dimensions.get('screen').width - 100,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Screen;
