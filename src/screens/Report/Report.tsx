import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {
  HomeStackParamsList,
  HomeStackRouteProps,
} from '../../types/HomeParamsList';
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import ProgressCircle from 'react-native-progress/Pie';
import axios from 'axios';
import { useAppSelector } from '../../redux-toolkit/hook';

type CreateClassPropType = StackNavigationProp<
  HomeStackParamsList,
  'CreateClass'
>;

type Props = {
  navigation: CreateClassPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'Report'>>();
  const [totalHomeWork, setTotalHw] = useState([]);
  const currentStudent = route.params.item;
  const studentName = currentStudent?.fullname ?? '';

  const getTotalHomework = async () => {
    const res = await axios.get(
      `${baseURL}users/${currentStudent.user_id}/homework`,
    );
    setTotalHw(res.data);
  };

  useEffect(() => {
    getTotalHomework();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={`Summary of ${studentName}`}
        isBackable={true}
      />
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
              : 0
          }
        />
      </View>
      <View style={styles.percentageBlock}>
        <View style={styles.percentageRow}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>
            Total homework
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>
            {totalHomeWork.length}
          </Text>
        </View>
        <View style={styles.percentageRow}>
          <Text style={styles.textCompleted}>Work completed</Text>
          <Text style={styles.textCompleted}>
            {totalHomeWork.length > 0
              ? Math.floor(
                  (totalHomeWork.filter(i => i.is_done === 'true').length /
                    totalHomeWork.length) *
                    100,
                )
              : 0}
            %
          </Text>
        </View>
        <View style={styles.percentageRow}>
          <Text style={styles.textNotCompleted}>Work not completed</Text>
          <Text style={styles.textNotCompleted}>
            {totalHomeWork.length > 0
              ? 100 -
                Math.floor(
                  (totalHomeWork.filter(i => i.is_done === 'true').length /
                    totalHomeWork.length) *
                    100,
                )
              : 0}
            %
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 24,
  },
  textNotCompleted: {
    color: colors.incompleted,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Screen;
