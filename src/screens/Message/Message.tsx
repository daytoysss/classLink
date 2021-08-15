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
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux-toolkit/hook';
import {
  baseURL,
  colors,
  ScreenHeight,
  ScreenWidth,
} from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: any;
};

const Message: React.FC<Props> = ({ navigation }) => {
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);
  const RootNavigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [totalStudent, setTotalStudent] = useState([]);
  const [historyUser, setHistoryUser] = useState([]);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleSendMessage = async () => {
    if (!messageContent || !selectedUser) {
      Alert.alert('ClassLink', 'All fields required!');
      return;
    }
    console.log(
      messageContent,
      totalStudent.find(i => i.username === selectedUser),
    );
    const opID = totalStudent.find(i => i.username === selectedUser).user_id;
    try {
      const res = await axios.post(
        `${baseURL}messages/${userInfor.user_id}/newMessage/${opID}`,
        {
          content: messageContent,
        },
      );
      setLoading(true);
      setMessageContent('');
      setShowCreateChat(false);
      getDataMessage();
    } catch (err) {
      Alert.alert('ClassLink', 'sth went wrong');
    }
  };

  const getDataMessage = async () => {
    try {
      const res = await axios.get(
        `${baseURL}messages/${userInfor.user_id}/users`,
      );
      setHistoryUser(res.data);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoading(false);
    }
  };

  const getTotalStudent = async () => {
    const res = await axios.get(`${baseURL}users`);
    console.log(res);
    setTotalStudent([
      {
        username: 'Select an user to chat',
        id: 999,
        user_id: 999,
      },
      ...res.data,
    ]);
  };

  useEffect(() => {
    getDataMessage();
    if (role === 'teacher') getTotalStudent();
  }, []);

  return (
    <>
      {showCreateChat && (
        <Modal visible={showCreateChat} transparent={true} animationType="fade">
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
                <TouchableOpacity onPress={() => setShowCreateChat(false)}>
                  <AntDesign name="close" size={30} />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.black,
                  }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={selectedUser}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log('change', itemIndex, itemValue);
                      setSelectedUser(itemValue);
                    }}>
                    {totalStudent.map((i, ind) =>
                      ind === 0 ? (
                        <Picker.Item
                          enabled={false}
                          key={i.user_id}
                          label={i.username}
                          value={i.username}
                        />
                      ) : (
                        <Picker.Item
                          key={i.user_id}
                          label={i.username}
                          value={i.username}
                        />
                      ),
                    )}
                  </Picker>
                </View>
                <View>
                  <TextInput
                    value={messageContent}
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={setMessageContent}
                    style={{
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: colors.black,
                      padding: 10,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSendMessage}
                  style={{
                    marginHorizontal: 30,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    alignSelf: 'center',
                    borderRadius: 20,
                    borderWidth: 1,
                    backgroundColor: colors.buttonNewClass,
                  }}>
                  <Text>Send</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="Message" isBackable={false} />
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {historyUser.map(i => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    RootNavigation.navigate('Main', {
                      screen: 'MessageDetail',
                      params: {
                        item: i,
                      },
                    })
                  }
                  key={i.id}
                  style={{
                    marginHorizontal: 30,
                    borderColor: colors.black,
                    borderWidth: 1,
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: colors.white,
                    borderRadius: 20,
                  }}>
                  <Text>{i.username}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={() => setShowCreateChat(true)}
          style={{
            height: 50,
            marginHorizontal: 30,
            borderColor: colors.black,
            borderWidth: 1,
            marginVertical: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: colors.buttonNewClass,
            borderRadius: 20,
            marginBottom: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontFamily: 'sans-serif' }}>Create new message</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.messageBgc,
    flex: 1,
  },
});

export default Message;
