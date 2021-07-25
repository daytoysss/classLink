import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../utils/constants';

type ClassItemType = {
  id: number;
  className: string;
  grade: string;
};

type Props = {
  item: ClassItemType;
};

const Screen: React.FC<Props> = ({ item }) => {
  const RootNavigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        RootNavigation.navigate('Main', {
          screen: 'ClassDetail',
          params: {
            item,
          },
        })
      }
      style={styles.container}>
      <View
        style={[
          styles.row,
          { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        ]}>
        <View style={[styles.itemTitle, { alignItems: 'center' }]}>
          <Text>Class Name</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text>: {item.className}</Text>
        </View>
      </View>
      <View
        style={[
          styles.row,
          {
            borderTopColor: colors.black,
            borderTopWidth: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}>
        <View style={[styles.itemTitle, { alignItems: 'center' }]}>
          <Text>Grade</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text>: {item.grade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});

export default Screen;
