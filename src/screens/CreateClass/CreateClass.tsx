import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { baseURL, colors } from '../../utils/constants';
import { Picker } from '@react-native-picker/picker';

type CreateClassPropType = StackNavigationProp<
  HomeStackParamsList,
  'CreateClass'
>;

type Props = {
  navigation: CreateClassPropType;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  const [grade, setGrade] = useState([]);
  const [className, setClassName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get(baseURL + 'grades');
      // console.log(res);
      setGrade([
        {
          id: 999,
          grade_id: 999,
          name: 'Please select a grade',
        },
        ...res.data,
      ]);
      setSelectedLanguage(res.data[0]);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addClass = async () => {
    const found = grade.find(i => i.name === selectedLanguage);
    if (!className || !found) {
      Alert.alert('ClassLink', 'All fields required!');
      return;
    } else {
      const res = await axios.post(baseURL + 'classes', {
        className,
        gradeID: found.grade_id,
      });
      Alert.alert('ClassLink', res.data.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title="Create new Class"
          isBackable={true}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Class Name</Text>
          <TextInput
            style={styles.input}
            value={className}
            onChangeText={setClassName}
          />
          <Text style={styles.label}>Grade</Text>
          <View
            style={{
              backgroundColor: colors.white,
              marginVertical: 20,
              borderColor: colors.black,
              borderWidth: 1,
            }}>
            {grade.length > 0 && (
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemIndex, itemValue);
                  setSelectedLanguage(itemValue);
                }}>
                {grade.map((i, ind) =>
                  ind === 0 ? (
                    <Picker.Item
                      enabled={false}
                      key={i.grade_id}
                      label={i.name}
                      value={i.name}
                    />
                  ) : (
                    <Picker.Item
                      key={i.grade_id}
                      label={i.name}
                      value={i.name}
                    />
                  ),
                )}
              </Picker>
            )}
          </View>
          <View style={styles.btnContainer}>
            <Button title="Add" onPress={addClass} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: { marginTop: 150, paddingHorizontal: 50 },
  input: {
    borderColor: colors.black,
    borderWidth: 1,
    width: Dimensions.get('screen').width - 100,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Screen;
