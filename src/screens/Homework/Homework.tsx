import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux-toolkit/hook';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import { baseURL, colors } from '../../utils/constants';

type Props = {
  navigation: any;
};

const Homework: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'Homework'>>();
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);
  const { student, homework } = route.params;
  const [done, setDone] = useState(true);
  const { user_id } = userInfor;
  const { homework_id } = homework;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === 'parent') getHomeworkStatus();
  }, []);

  const getHomeworkStatus = async () => {
    const res = await axios.get(
      `${baseURL}users/${user_id}/homework/${homework_id}`,
    );
    setDone(res.data.is_done === 'false' ? false : true);
    setLoading(false);
  };

  const submitHomework = async () => {
    try {
      const res = await axios.put(
        `${baseURL}users/${user_id}/homework/${homework_id}`,
      );
      setDone(true);
      Alert.alert('ClassLink', 'Done!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch {}
  };

  const assignHomework = async () => {
    console.log(
      homework.homework_id,
      student.map(i => i.user_id),
    );
    const res = await axios.post(baseURL + 'users/parent/homework', {
      homework_id: homework.homework_id,
      userIDs: student.map(i => i.user_id),
    });
    if (res.data.status === 'success') {
      Alert.alert('ClassLink', 'Assign done!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Homework'} isBackable={true} />
      {role === 'teacher' ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 20,
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title: </Text>
            <Text>{homework?.homework_title ?? ''}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Description:{' '}
            </Text>
            <Text>{homework?.homework_description ?? ''}</Text>
          </View>
          <TouchableOpacity
            onPress={assignHomework}
            style={{
              marginHorizontal: 30,
              paddingHorizontal: 30,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.bookingBgc,
              borderRadius: 20,
              marginTop: 20,
              marginBottom: 30,
            }}>
            <Text>Assign this homework to all students</Text>
          </TouchableOpacity>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: colors.black,
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Students in this class
            </Text>
            {student.length === 0 ? (
              <Text>No student to assign!</Text>
            ) : (
              student.map(i => {
                return (
                  <View
                    key={i.user_id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 20 }}>Student's name: </Text>
                    <Text style={{ fontSize: 20 }}>{i.username}</Text>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 20,
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title: </Text>
            <Text>{homework?.homework_title ?? ''}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Description:{' '}
            </Text>
            <Text>{homework?.homework_description ?? ''}</Text>
          </View>
          {done ? (
            <View
              style={{
                marginHorizontal: 30,
                paddingHorizontal: 30,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 30,
              }}>
              {!loading ? (
                <Text>This homework is done</Text>
              ) : (
                <ActivityIndicator color="black" size="large" />
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={submitHomework}
              style={{
                marginHorizontal: 30,
                paddingHorizontal: 30,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bookingBgc,
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Text>Submit this homework</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default Homework;
