import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ClassItem from '../../components/ClassItem';
import Header from '../../components/Header';
import { colors } from '../../utils/constants';

type Props = {
  navigation: undefined;
};

type ClassItemType = {
  id: number;
  className: string;
  grade: string;
};

const fakeData: ClassItemType[] = [
  {
    id: 1,
    className: 'Demo Class',
    grade: 'Kindergarten',
  },
  {
    id: 2,
    className: 'Demo Class',
    grade: 'Kindergarten',
  },
  {
    id: 3,
    className: 'Demo Class',
    grade: 'Kindergarten',
  },
];

const Screen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Class Room" isBackable={false} />
      <ScrollView contentContainerStyle={styles.classContainer}>
        {fakeData.map((i: ClassItemType) => {
          return (
            <View style={styles.classItem} key={i.id}>
              <ClassItem item={i} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.classroomBgc,
    flex: 1,
  },
  classContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 150,
  },
  classItem: {
    height: 100,
    marginBottom: 20,
  },
});

export default Screen;
