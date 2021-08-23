import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { TabParams } from '../../types/TabParams';
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux-toolkit/hook';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

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
        username: '- Please select a parent -',
        fullname: '- Please select a parent -',
      },
      ...res.data,
    ]);
  };

  useEffect(() => {
    if (role === 'teacher') getParents();
  }, []);

  const renderCreatePostModal = () => {
    return (
      <Modal
        visible={showCreateMeeting}
        transparent={true}
        animationType="fade">
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}>
            <View
              style={{
                // height: 400,
                width: ScreenWidth - 40,
                backgroundColor: colors.white,
                borderColor: colors.black,
                borderRadius: 20,
                borderWidth: 0.5,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowCreateMeeting(false);
                  }}
                  style={{
                    position: 'absolute',
                    left: 5,
                    top: 15,
                  }}>
                  <AntDesign name="close" size={20} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-medium' }}>
                  Appointment Preview
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 30,
                  justifyContent: 'space-around',
                }}>
                <Text>
                  Start Time: {new Date(startDate).toDateString().slice(4, 10)}{' '}
                  at{' '}
                  {`${new Date(startDate).getHours()}:${new Date(
                    startDate,
                  ).getMinutes()}`}
                </Text>
                <Text>
                  End Time: {new Date(endDate).toDateString().slice(4, 10)} at{' '}
                  {`${new Date(endDate).getHours()}:${new Date(
                    endDate,
                  ).getMinutes()}`}
                </Text>
                <Text>Message: {message}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.homeBgc,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 10,
                  flexDirection: 'row',
                  marginHorizontal: '30%',
                  marginBottom: 20,
                }}
                onPress={handleBooking}>
                <Text style={{ color: colors.white }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Booking"
        isBackable={false}
        rightButtonTitle="My Meeting"
      />
      {renderCreatePostModal()}
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        {role === 'teacher' && (
          <View style={styles.section}>
            <Text style={styles.label}>Select a Parent</Text>
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
          <TouchableOpacity
            onPress={() => setShowCreateMeeting(true)}
            style={styles.btnCreate}>
            <Text style={{ color: colors.white }}>Create appointment</Text>
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
    backgroundColor: colors.buttonNewClass,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Booking;
