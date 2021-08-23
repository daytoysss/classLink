import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { TabParams } from '../../types/TabParams';
import { baseURL, colors } from '../../utils/constants';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux-toolkit/hook';
import axios from 'axios';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const Booking: React.FC<Props> = ({ navigation }) => {
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);
  const [selectedParent, setSelectedParent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [allParent, setAllParent] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let temp = new Date(startDate.getTime());
    const nextDate = temp.setMinutes(temp.getMinutes() + 15);
    setEndDate(new Date(nextDate));
    setMinEndDate(new Date(nextDate));
  }, [startDate]);

  const handleBooking = async () => {
    if (!message) {
      Alert.alert('ClassLink', 'Message is required!');
      return;
    }
    const found = allParent.find(i => i.username === selectedParent);
    try {
      const res = await axios.post(baseURL + 'meetings', {
        user_id: found ? found.user_id : userInfor.user_id,
        start_date: startDate,
        end_date: endDate,
        message,
      });
      Alert.alert('ClassLink', res.data.message);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    }
  };

  const getParents = async () => {
    const res = await axios.get(`${baseURL}users/parent/allParents`);
    console.log(res.data);
    setAllParent([
      {
        id: 999,
        user_id: 999,
        username: 'Please select a parent',
        fullname: 'Please select a parent',
      },
      ...res.data,
    ]);
  };

  useEffect(() => {
    if (role === 'teacher') getParents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Booking"
        isBackable={false}
        rightButtonTitle="My Meeting"
      />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        {role === 'teacher' && (
          <View style={styles.section}>
            <Text style={styles.label}>Select a parent</Text>
            <View style={styles.picker}>
              {allParent.length > 0 && (
                <Picker
                  mode="dropdown"
                  selectedValue={selectedParent}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log(itemIndex, itemValue);
                    setSelectedParent(itemValue);
                  }}>
                  {allParent.map((i, ind) =>
                    ind === 0 ? (
                      <Picker.Item
                        enabled={false}
                        key={i.user_id}
                        label={i.fullname}
                        value={i.username}
                      />
                    ) : (
                      <Picker.Item
                        key={i.user_id}
                        label={i.fullname}
                        value={i.username}
                      />
                    ),
                  )}
                </Picker>
              )}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Select a Date</Text>
          <Text style={styles.subLabel}>Choose start date</Text>
          <View>
            <DatePicker
              style={{
                backgroundColor: 'white',
                flexGrow: 1,
                width: Dimensions.get('screen').width - 40,
              }}
              date={startDate}
              onDateChange={e => {
                setStartDate(e);
              }}
            />
          </View>
          <Text style={styles.subLabel}>Choose end date</Text>
          <View>
            <DatePicker
              style={{
                backgroundColor: 'white',
                flexGrow: 1,
                width: Dimensions.get('screen').width - 40,
              }}
              minimumDate={minEndDate}
              date={endDate}
              onDateChange={setEndDate}
            />
          </View>
        </View>
        <TextInput
          placeholder={
            role === 'parent'
              ? 'Enter a message to teacher'
              : 'Enter a message to parent'
          }
          numberOfLines={4}
          textAlignVertical="top"
          multiline={true}
          value={message}
          onChangeText={setMessage}
          style={{
            borderWidth: 0.5,
            borderColor: colors.black,
            backgroundColor: 'white',
            padding: 20,
          }}
        />
        <View style={styles.section}>
          <TouchableOpacity onPress={handleBooking} style={styles.btnCreate}>
            <Text>Create appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bookingBgc,
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
  body: {
    marginHorizontal: 20,
    paddingBottom: 150,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    color: colors.title,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  subLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  btnCreate: {
    marginTop: 30,
    backgroundColor: '#169bd5',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Booking;
