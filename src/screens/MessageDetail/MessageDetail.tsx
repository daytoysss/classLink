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
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import { useRoute } from '@react-navigation/native';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  navigation: any;
};

const Message: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'MessageDetail'>>();
  const { item } = route.params;
  const userInfor = useAppSelector(state => state.user.info);
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = async () => {
    if (!messageContent) {
      Alert.alert('ClassLink', 'All fields required!');
      return;
    }
    try {
      const res = await axios.post(
        `${baseURL}messages/${userInfor.user_id}/newMessage/${item.user_id}`,
        {
          content: messageContent,
        },
      );
      setLoading(true);
      setMessageContent('');
      getChatHistory();
    } catch (err) {
      Alert.alert('ClassLink', 'sth went wrong');
    }
  };

  const getChatHistory = async () => {
    try {
      const res = await axios.get(
        `${baseURL}messages/${userInfor.user_id}/history/${item.user_id}`,
      );
      console.log(res);
      setAllMessages(res.data);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={item?.fullname ?? ''}
        isBackable={true}
      />
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          {allMessages.length > 0 ? (
            allMessages.map(i => {
              return (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    },
                    userInfor.user_id === i.from_id
                      ? {
                          marginLeft: '40%',
                          marginRight: 20,
                          justifyContent: 'flex-end',
                        }
                      : {
                          marginRight: '40%',
                          marginLeft: 20,
                          justifyContent: 'flex-start',
                        },
                  ]}>
                  {/* <Text
                    style={{ marginRight: 20, fontWeight: 'bold', width: 100 }}>
                    {i.from_username}:
                  </Text> */}
                  <Text
                    style={[
                      {
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                      },
                      userInfor.user_id === i.from_id
                        ? {
                            backgroundColor: '#3d9ef8',
                            color: 'white',
                          }
                        : {
                            backgroundColor: '#e8e4e4',
                          },
                    ]}>
                    {i.message_content}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text>No messages</Text>
          )}
        </ScrollView>
      )}
      <View
        style={{
          backgroundColor: colors.classroomBgc,
          borderWidth: 0.5,
          borderColor: colors.black,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <TextInput
          value={messageContent}
          onChangeText={setMessageContent}
          placeholder="Type something..."
          style={{
            backgroundColor: colors.white,
            width: ScreenWidth - 100,
            paddingLeft: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            width: 60,
          }}>
          {pending ? (
            <ActivityIndicator size={20} color="black" />
          ) : (
            <Feather size={20} name="send" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.messageBgc,
    flex: 1,
  },
});

export default Message;
