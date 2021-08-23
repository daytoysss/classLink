import { useNavigation, useRoute } from '@react-navigation/native';
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
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import {
  baseURL,
  colors,
  ScreenHeight,
  ScreenWidth,
} from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppSelector } from '../../redux-toolkit/hook';

type Props = {
  navigation: any;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  const route = useRoute<HomeStackRouteProps<'ClassDetail'>>();
  const role = useAppSelector(state => state.role.role);
  const { item } = route.params;
  const [loadingHomework, setLoadingHomework] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [loading, setLoading] = useState(true);

  const [homwork, setHomeWork] = useState([]);
  const [student, setStudent] = useState([]);

  const [showAddHomeWorkModal, setShowAddHomeworkModal] = useState(false);
  const [hwTitle, setHwTitle] = useState('');
  const [hwDes, setHwDes] = useState('');

  const [allStudent, setAllStudent] = useState([]);
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

  const getAllStudents = async () => {
    try {
      const res = await axios.get(`${baseURL}users/parent/allParents`);
      const { data } = res;
      setAllStudent(
        data.map(i => {
          return {
            ...i,
            alreadySelected: student.find(st => st.user_id === i.user_id)
              ? true
              : false,
            selected: student.find(st => st.user_id === i.user_id)
              ? true
              : false,
          };
        }),
      );
    } catch (err) {
      console.log(err);
    }
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
      if (role === 'teacher') refreshAll();
      else {
        getHomeworkByClassID(item.class_id);
        setLoading(false);
      }
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

  const handleAddStudent = async () => {
    const selectedStudents = allStudent.filter(
      i => i.selected && !i.alreadySelected,
    );
    try {
      const res = await axios.post(
        `${baseURL}classes/${item.class_id}/students`,
        {
          ids: selectedStudents.map(i => i.user_id),
        },
      );
      if (res.data.status !== 'success') {
        Alert.alert('ClassLink', res.data.message);
      } else {
        setShowAddStudentModal(false);
        await refreshAll();
      }
    } catch (err) {
      console.log(err);
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

  const renderAddStudent = () => {
    return (
      <Modal
        visible={showAddStudentModal}
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
              height: ScreenHeight - 100,
            }}>
            <View
              style={{
                width: ScreenWidth - 40,
                height: ScreenHeight - 100,
                padding: 20,
                backgroundColor: colors.white,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShowAddStudentModal(false);
                  setAllStudent([]);
                }}>
                <AntDesign name="close" size={30} />
              </TouchableOpacity>
              <FlatList
                numColumns={2}
                keyExtractor={item => item?.user_id?.toString() ?? ''}
                data={allStudent}
                extraData={allStudent}
                renderItem={({ item }) => {
                  return item.alreadySelected ? (
                    <View
                      style={{
                        backgroundColor: 'green',
                        flex: 1,
                        borderColor: colors.black,
                        borderWidth: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <Text>{item?.username ?? ''}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        const isSelected = item.selected;
                        setAllStudent(student =>
                          student.map(st => {
                            return st.user_id === item.user_id
                              ? {
                                  ...st,
                                  selected: !isSelected,
                                }
                              : st;
                          }),
                        );
                      }}
                      style={{
                        backgroundColor: item.selected ? 'green' : 'white',
                        flex: 1,
                        borderColor: colors.black,
                        borderWidth: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <Text>{item?.username ?? ''}</Text>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  flexGrow: 1,
                }}
              />
              <TouchableOpacity
                onPress={handleAddStudent}
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

  return role === 'teacher' ? (
    <>
      {renderAddHomework()}
      {renderAddStudent()}
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
              paddingBottom: 50,
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
                  marginBottom: 20,
                }}>
                Homeworks
              </Text>
              {homwork.length === 0 ? (
                <Text>No homework!</Text>
              ) : (
                homwork.map((i, ind) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        RootNavigation.navigate('Homework', {
                          homework: i,
                          student,
                        })
                      }
                      key={i.homework_id}
                      style={{
                        borderWidth: 0.5,
                        borderColor: colors.black,
                        padding: 20,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          paddingBottom: 20,
                          borderBottomWidth: 0.5,
                          borderColor: colors.black,
                        }}>
                        Number #{ind + 1}{' '}
                        {role === 'teacher' && `(click to assign to student)`}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          paddingTop: 20,
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
                    </TouchableOpacity>
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
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  {student.map(i => {
                    return (
                      <View
                        key={i.user_id}
                        style={{
                          width: '50%',
                          marginVertical: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 100,
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            borderColor: colors.black,
                            borderWidth: 0.5,
                            borderRadius: 500,
                          }}>
                          <AntDesign name="user" size={30} />
                          <Text>{i.username}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                setShowAddStudentModal(true);
                await getAllStudents();
              }}
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
  ) : (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title={item.name ?? ''}
          isBackable={true}
        />
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
              paddingBottom: 50,
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
                  marginBottom: 20,
                }}>
                Homeworks
              </Text>
              {homwork.length === 0 ? (
                <Text>No homework!</Text>
              ) : (
                homwork.map((i, ind) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        RootNavigation.navigate('Homework', {
                          homework: i,
                          student,
                        })
                      }
                      key={i.homework_id}
                      style={{
                        borderWidth: 0.5,
                        borderColor: colors.black,
                        padding: 20,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          paddingBottom: 20,
                          borderBottomWidth: 0.5,
                          borderColor: colors.black,
                        }}>
                        Number #{ind + 1}{' '}
                        {role === 'teacher' && `(click to assign to student)`}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          paddingTop: 20,
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
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
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
