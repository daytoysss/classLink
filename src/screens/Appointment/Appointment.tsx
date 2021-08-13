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
import { baseURL, colors } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParams } from '../../types/DrawerParams';
import axios from 'axios';
import { useAppSelector } from '../../redux-toolkit/hook';

const MeetItem = props => {
  const role = useAppSelector(state => state.role.role);
  const { item } = props;
  const startDate = item.start_date;
  const endDate = item.end_date;
  let status = 'Meeting';
  if (new Date(endDate) < new Date(Date.now())) status = 'Done';
  if (new Date(startDate) > new Date(Date.now())) status = 'Waiting';
  return (
    <View style={styles.cardContainer} key={item.meeting_id}>
      {role === 'teacher' ? (
        <Text style={styles.cardText}>
          Meeting with {item.username}' s parents
        </Text>
      ) : (
        <Text style={styles.cardText}>Meeting with teacher</Text>
      )}
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
      <Text style={styles.cardText}>Message: {item.message}</Text>
      <Text style={styles.cardText}>Status: {status}</Text>
    </View>
  );
};

type MeetingPropType = DrawerNavigationProp<DrawerParams, 'Appointment'>;

type Props = {
  navigation: MeetingPropType;
};

const Appointment: React.FC<Props> = ({ navigation }) => {
  const role = useAppSelector(state => state.role.role);
  const userInfo = useAppSelector(state => state.user.info);
  const [loading, setLoading] = useState(true);
  const [meetList, setMeetList] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${baseURL}meetings/${
          role === 'teacher' ? '' : userInfo.user_id + '/allMeetings'
        }`,
      );
      console.log(res.data);
      setMeetList(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const sub = navigation.addListener('focus', async () => await getData());

    return sub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Appointments" isBackable={true} />
      {!loading ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {meetList.length === 0 ? (
            <Text>You do not have any appoinments</Text>
          ) : (
            <>
              {meetList.map((item: any) => (
                <MeetItem item={item} />
              ))}
            </>
          )}
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
