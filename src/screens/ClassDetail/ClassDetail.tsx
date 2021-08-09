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
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  navigation: any;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'ClassDetail'>>();
  const { item } = route.params;
  const [loadingHomework, setLoadingHomework] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [loading, setLoading] = useState(true);

  const [homwork, setHomeWork] = useState([]);
  const [student, setStudent] = useState([]);

  const [showAddHomeWorkModal, setShowAddHomeworkModal] = useState(false);
  const [hwTitle, setHwTitle] = useState('');
  const [hwDes, setHwDes] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  useEffect(() => {
    if (!loadingHomework && !loadingStudent) setLoading(false);
  }, [loadingStudent, loadingHomework]);

  const refreshAll = async () => {
    setLoading(true);
    setLoadingHomework(true);
    setLoadingStudent(true);
    getHomeworkByClassID(item.class_id);
    getStudensByClassID(item.class_id);
  };

  const getHomeworkByClassID = async classID => {
    try {
      const res = await axios.get(
        `${baseURL}classes/${item.class_id}/homeworks`,
      );
      const { data } = res;
      setHomeWork(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingHomework(false);
    }
  };

  const getStudensByClassID = async classID => {
    try {
      const res = await axios.get(
        `${baseURL}classes/${item.class_id}/students`,
      );
      const { data } = res;
      setStudent(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingStudent(false);
    }
  };

  useEffect(() => {
    if (item.class_id) {
      refreshAll();
    }
  }, []);

  const handleAddHomework = async () => {
    console.log(hwTitle, hwDes);
    if (!hwDes || !hwTitle) {
      Alert.alert('ClassLink', 'All fields required!');
      return;
    } else {
      const res = await axios.post(
        `${baseURL}classes/${item.class_id}/homeworks`,
        {
          title: hwTitle,
          description: hwDes,
        },
      );
      if (res.data.status !== 'success') {
        Alert.alert('ClassLink', res.data.message);
      } else {
        setShowAddHomeworkModal(false);
        setHwTitle('');
        setHwDes('');
        await refreshAll();
      }
    }
  };

  const renderAddHomework = () => {
    return (
      <Modal
        visible={showAddHomeWorkModal}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{
              width: ScreenWidth - 40,
              height: ScreenWidth - 40,
            }}>
            <View
              style={{
                width: ScreenWidth - 40,
                height: ScreenWidth - 40,
                padding: 20,
                backgroundColor: colors.white,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setShowAddHomeworkModal(false)}>
                <AntDesign name="close" size={30} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 24 }}>Title:</Text>
                <TextInput
                  value={hwTitle}
                  placeholder="Homework title"
                  onChangeText={setHwTitle}
                  style={{
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: colors.black,
                    padding: 10,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 24 }}>Description:</Text>
                <TextInput
                  value={hwDes}
                  placeholder="Homework description"
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={setHwDes}
                  style={{
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: colors.black,
                    padding: 10,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={handleAddHomework}
                style={{
                  marginHorizontal: 30,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  alignSelf: 'center',
                  borderRadius: 20,
                  borderWidth: 1,
                  backgroundColor: colors.buttonNewClass,
                }}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  };

  return (
    <>
      {renderAddHomework()}
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title={item?.className ?? ''}
          isBackable={true}
        />
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView
            style={{
              marginHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
            }}>
            <View
              style={{
                flexGrow: 1,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Homeworks
              </Text>
              {homwork.length === 0 ? (
                <Text>No homework!</Text>
              ) : (
                homwork.map((i, ind) => {
                  return (
                    <View key={i.homework_id}>
                      <Text style={{ fontWeight: 'bold' }}>#{ind + 1}</Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text>Title: </Text>
                        <Text>{i.homework_title}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text>Description: </Text>
                        <Text>{i.homework_description}</Text>
                      </View>
                    </View>
                  );
                })
              )}
              <TouchableOpacity
                onPress={() => setShowAddHomeworkModal(true)}
                style={{
                  marginHorizontal: 50,
                  marginVertical: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 30,
                  backgroundColor: colors.buttonNewClass,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: colors.white }}>Add new homework</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexGrow: 1,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Students
              </Text>
              {student.length === 0 ? (
                <Text>No student!</Text>
              ) : (
                student.map(i => {
                  return (
                    <View
                      key={i.user_id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ fontSize: 20 }}>Student Name: </Text>
                      <Text style={{ fontSize: 20 }}>{i.username}</Text>
                    </View>
                  );
                })
              )}
            </View>
            <TouchableOpacity
              onPress={() => setShowAddStudentModal(true)}
              style={{
                marginHorizontal: 50,
                marginVertical: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 30,
                backgroundColor: colors.buttonNewClass,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: colors.white }}>
                Add student to this class
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default Screen;
