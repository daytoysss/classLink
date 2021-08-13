import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux-toolkit/hook';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { TabParams } from '../../types/TabParams';
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ProgressCircle from 'react-native-progress/Pie';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Summary'>;

type Props = {
  navigation: HomeStackProps;
};

const listStudent = [
  {
    id: 1,
    name: 'Jane',
    avatar:
      'https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png',
  },
  {
    id: 2,
    name: 'Dave',
    avatar:
      'https://wapvippro.net/wp-content/uploads/2020/04/avatar-facebook-chibi-12.jpg',
  },
  {
    id: 3,
    name: 'Harry',
    avatar:
      'https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png',
  },
  {
    id: 4,
    name: 'Mike',
    avatar:
      'https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png',
  },
];

const Summary: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);
  const [totalHomeWork, setTotalHw] = useState([]);
  const [totalStudent, setTotalStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTotalHomework = async () => {
    const res = await axios.get(
      `${baseURL}users/${userInfor.user_id}/homework`,
    );
    setTotalHw(res.data);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await getTotalStudent();
  };

  const getTotalStudent = async () => {
    const res = await axios.get(`${baseURL}users/parent/allParents`);
    setTotalStudent(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (role === 'parent') getTotalHomework();
    else getTotalStudent();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="View report" isBackable={false} />
      {role === 'teacher' ? (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginHorizontal: 20,
            }}>
            All students (click to view summary)
          </Text>
          <FlatList
            refreshing={loading}
            onRefresh={handleRefresh}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: 150,
            }}
            data={totalStudent}
            extraData={totalStudent}
            keyExtractor={item => item?.user_id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  RootNavigation.navigate('Main', {
                    screen: 'Report',
                    params: {
                      item,
                    },
                  })
                }
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  marginBottom: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  borderColor: colors.black,
                  borderWidth: 0.5,
                  borderRadius: 500,
                }}>
                <AntDesign name="user" size={30} />
                <Text>{item.username}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View
          style={{
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 50,
              height: 50,
              borderWidth: 1,
              backgroundColor: colors.classroomBgc,
              marginHorizontal: 50,
              position: 'relative',
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                top: 0,
              }}>
              <AntDesign name="user" size={40} />
            </View>
            <View
              style={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {userInfor.username}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <ProgressCircle
              unfilledColor={colors.incompleted}
              color={colors.completed}
              textStyle={'white'}
              size={ScreenWidth / 2}
              progress={
                totalHomeWork.length > 0
                  ? parseFloat(
                      (
                        totalHomeWork.filter(i => i.is_done === 'true').length /
                        totalHomeWork.length
                      ).toFixed(2),
                    )
                  : 0.5
              }
            />
          </View>
          {totalHomeWork.length > 0 ? (
            <View style={styles.percentageBlock}>
              <View style={styles.percentageRow}>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                  Total homework
                </Text>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                  {totalHomeWork.length}
                </Text>
              </View>
              <View style={styles.percentageRow}>
                <Text style={styles.textCompleted}>Work completed</Text>
                <Text style={styles.textCompleted}>
                  {Math.floor(
                    (totalHomeWork.filter(i => i.is_done === 'true').length /
                      totalHomeWork.length) *
                      100,
                  )}
                  %
                </Text>
              </View>
              <View style={styles.percentageRow}>
                <Text style={styles.textNotCompleted}>Work not completed</Text>
                <Text style={styles.textNotCompleted}>
                  {100 -
                    Math.floor(
                      (totalHomeWork.filter(i => i.is_done === 'true').length /
                        totalHomeWork.length) *
                        100,
                    )}
                  %
                </Text>
              </View>
            </View>
          ) : (
            <Text>Nothing to show!</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.summaryBgc,
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
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageBlock: {
    marginTop: 50,
    marginHorizontal: 50,
  },
  percentageRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCompleted: {
    color: colors.completed,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textNotCompleted: {
    color: colors.incompleted,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Summary;
