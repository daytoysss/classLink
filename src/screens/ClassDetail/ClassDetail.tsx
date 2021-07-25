import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import { colors } from '../../utils/constants';

type Props = {
  navigation: any;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'ClassDetail'>>();
  const { item } = route.params;
  console.log(item);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Class Detail" isBackable={true} />
      <TouchableOpacity>
        <Text>{item.id}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default Screen;
