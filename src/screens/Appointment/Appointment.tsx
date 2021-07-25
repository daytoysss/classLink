import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParams } from '../../types/DrawerParams';

const MeetItem = props => {
  const { item } = props;
  const startDate = item.start;
  const endDate = item.end;
  let status = 'Meeting';
  if (new Date(endDate) < new Date(Date.now())) status = 'Done';
  if (new Date(startDate) > new Date(Date.now())) status = 'Waiting';
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>Meeting with {item.parent}'s parents</Text>
      <Text style={styles.cardText}>
        Start: {new Date(startDate).toDateString().slice(4, 10)} at{' '}
        {`${new Date(startDate).getHours()}:${new Date(
          startDate,
        ).getMinutes()}`}
      </Text>
      <Text style={styles.cardText}>
        End: {new Date(endDate).toDateString().slice(4, 10)} at{' '}
        {`${new Date(endDate).getHours()}:${new Date(endDate).getMinutes()}`}
      </Text>
      <Text style={styles.cardText}>Status: {status}</Text>
    </View>
  );
};

type MeetingPropType = DrawerNavigationProp<DrawerParams, 'Appointment'>;

type Props = {
  navigation: MeetingPropType;
};

const Appointment: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [meetList, setMeetList] = useState([]);

  const getData = async () => {
    try {
      const list = await AsyncStorage.getItem('list');
      if (list) {
        const ListData = JSON.parse(list);
        setMeetList(ListData.filter((i: any) => i.parent));
      } else {
        setMeetList([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    const sub = navigation.addListener('focus', async () => await getData());

    return sub;
  }, [getData, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Appointments" isBackable={true} />
      {!loading ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {meetList.map((item: any) => (
            <MeetItem item={item} />
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  text: {
    color: colors.white,
  },
  cardContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    marginTop: 40,
  },
  cardText: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingLeft: 20,
    paddingVertical: 10,
    fontSize: 24,
  },
});

export default Appointment;
