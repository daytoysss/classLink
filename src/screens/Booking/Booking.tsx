import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { TabParams } from '../../types/TabParams';
import { colors } from '../../utils/constants';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const Booking: React.FC<Props> = ({ navigation }) => {
  const [selectedParent, setSelectedParent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    let temp = new Date(startDate.getTime());
    const nextDate = temp.setMinutes(temp.getMinutes() + 5);
    setEndDate(new Date(nextDate));
  }, [startDate]);

  const handleBooking = async () => {
    if (selectedParent === '-1' || selectedParent === '') {
      Alert.alert('ClassLink', 'You must select a parent!');
      return;
    }
    const appointmentList = await AsyncStorage.getItem('list');
    try {
      if (appointmentList) {
        let list = JSON.parse(appointmentList);
        list.push({
          id: list.length,
          start: startDate,
          end: endDate,
          parent: selectedParent,
        });
        await AsyncStorage.setItem('list', JSON.stringify(list));
        Alert.alert('ClassLink', 'Appoitment created successfully!');
      } else {
        let list = [];
        list.push({
          id: 0,
          start: startDate,
          end: endDate,
          parent: selectedParent,
        });
        await AsyncStorage.setItem('list', JSON.stringify(list));
        Alert.alert('ClassLink', 'Appoitment created successfully!');
      }
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Booking" isBackable={false} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Select a parent</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedParent}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedParent(itemValue)
              }>
              <Picker.Item label="--Select a parent--" value="-1" />
              <Picker.Item label="Jane" value="jane" />
              <Picker.Item label="Dave" value="dave" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Select a Date</Text>
          <Text style={styles.subLabel}>Choose start date</Text>
          <DatePicker
            date={startDate}
            onDateChange={e => {
              setStartDate(e);
            }}
          />
          <Text style={styles.subLabel}>Choose end date</Text>
          <DatePicker date={endDate} onDateChange={setEndDate} />
        </View>

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
