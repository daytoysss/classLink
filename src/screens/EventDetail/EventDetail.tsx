import { useRoute } from '@react-navigation/native';
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
import Header from '../../components/Header';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import { baseURL, colors } from '../../utils/constants';

type Props = {
  navigation: any;
};

const EventDetail: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'EventDetail'>>();
  const { item } = route.params;
  const getData = async () => {
    try {
      const res = await axios.get(baseURL + '/api/grades');
      console.log(res);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={'Event Detail'}
        isBackable={true}
      />
      <TouchableOpacity>
        <Text>{item?.post_title ?? ''}</Text>
        <Text>{item?.post_content ?? ''}</Text>
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

export default EventDetail;
