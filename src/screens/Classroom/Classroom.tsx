import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ClassItem from '../../components/ClassItem';
import Header from '../../components/Header';
import { baseURL, colors, ScreenHeight } from '../../utils/constants';
import { Picker } from '@react-native-picker/picker';
import { useAppSelector } from '../../redux-toolkit/hook';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: undefined;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const [grade, setGrade] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState<any>();
  const [classes, setClasses] = useState([]);
  const role = useAppSelector(state => state.role.role);
  const [loading, setLoading] = useState(true);
  const [loadingClass, setLoadingClass] = useState(true);
  const RootNavigation = useNavigation();
  console.log('role', role);

  const getData = async () => {
    try {
      const res = await axios.get(baseURL + 'grades/');
      // console.log(res.data);
      setGrade(res.data);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoading(false);
    }
  };

  const getClassesByGradeID = async (classID: string) => {
    setLoadingClass(true);
    try {
      const res = await axios.get(
        baseURL + 'classes/classByGradeID/' + classID,
      );
      console.log(res.data);
      setClasses(res.data);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoadingClass(false);
    }
  };

  useEffect(() => {
    if (role === 'teacher') getData();
  }, []);

  useEffect(() => {
    const found = grade.find(i => i.name === selectedGrade);
    if (found) {
      getClassesByGradeID(found.grade_id);
    } else {
      console.log('not found');
    }
  }, [selectedGrade]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Class Room" isBackable={false} />
      {role === 'teacher' ? (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: 150,
          }}>
          <Text style={styles.classTitle}>Choose a grade to view</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="black"
              style={{
                marginTop: 20,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.white,
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              {grade.length > 0 ? (
                <Picker
                  mode="dropdown"
                  selectedValue={selectedGrade}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('change', itemIndex, itemValue);
                    setSelectedGrade(itemValue);
                  }}>
                  {grade.map(i => (
                    <Picker.Item
                      key={i.grade_id}
                      label={i.name}
                      value={i.name}
                    />
                  ))}
                </Picker>
              ) : (
                <Text>No grades!</Text>
              )}
            </View>
          )}
          {!!selectedGrade && (
            <View style={styles.classContainer}>
              {loadingClass ? (
                <ActivityIndicator
                  size="large"
                  color="black"
                  style={{
                    marginTop: 20,
                  }}
                />
              ) : (
                <View>
                  {classes.length > 0 ? (
                    classes.map(i => {
                      return (
                        <View style={styles.classItem} key={i.id}>
                          <ClassItem item={i} />
                          {/* <Text>Class</Text> */}
                        </View>
                      );
                    })
                  ) : (
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      No classes!
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonCreate}
            onPress={() =>
              RootNavigation.navigate('Main', {
                screen: 'CreateClass',
              })
            }>
            <Text style={[styles.text, { fontSize: 40 }]}>+</Text>
            <Text style={[styles.text, { fontSize: 30 }]}>New class</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View>
          <Text>Hi parent</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.classroomBgc,
    flex: 1,
    height: ScreenHeight - 100,
  },
  buttonCreate: {
    height: 50,
    backgroundColor: colors.buttonNewClass,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.pinkBgc,
    marginHorizontal: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
  classTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    height: 50,
  },
  classContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  classItem: {
    height: 100,
    marginBottom: 20,
  },
});

export default Screen;
