import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import { HomeStackRouteProps } from '../../types/HomeParamsList';
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import Feather from 'react-native-vector-icons/Feather';
import { useAppSelector } from '../../redux-toolkit/hook';

type Props = {
  navigation: any;
};

const EventDetail: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<HomeStackRouteProps<'EventDetail'>>();
  const userInfor = useAppSelector(state => state.user.info);
  // console.log(userInfor);
  const { item } = route.params;
  const [loadingComment, setLoadingComment] = useState(true);
  const [pending, setPending] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCmt, setNewCmt] = useState('');

  const sendComment = async () => {
    if (!newCmt) {
      Alert.alert('ClassLink', 'Content are required!');
      return;
    } else {
      setPending(true);
      try {
        const res = await axios.post(
          `${baseURL}posts/${item.post_id}/comments`,
          {
            comment_content: newCmt,
            user_id: userInfor.user_id,
          },
        );
        if (res.data.status !== 'success') {
          Alert.alert('ClassLink', res.data.message);
        } else {
          setNewCmt('');
          await getData();
        }
      } catch (err) {
        Alert.alert('ClassLink', JSON.stringify(err.response));
      } finally {
        setLoadingComment(false);
        setPending(false);
      }
    }
  };

  const getData = async () => {
    setLoadingComment(true);
    try {
      const res = await axios.get(`${baseURL}posts/${item.post_id}/comments`);
      setComments(res.data);
    } catch (err) {
      Alert.alert('ClassLink', JSON.stringify(err.response));
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={'Event Detail'}
        isBackable={true}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        <View
          style={{
            borderColor: colors.black,
            borderWidth: 0.5,
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              padding: 20,
              borderBottomColor: colors.black,
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {item?.post_title ?? ''}
            </Text>
            <Text style={{ fontSize: 13, fontStyle: 'italic' }}>
              Posted by {item?.username ?? ''} at{' '}
              {item?.created_at
                ? new Date(item?.created_at).toDateString().slice(4, 10)
                : ''}
            </Text>
          </View>
          <View
            style={{
              padding: 20,
            }}>
            <Text>{item?.post_content ?? ''}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          {loadingComment ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <View>
              {comments.length === 0 ? (
                <Text>No comments created yet!</Text>
              ) : (
                comments.map(i => {
                  return (
                    <View
                      key={i.comment_id}
                      style={{
                        borderWidth: 0.5,
                        borderColor: colors.black,
                        padding: 20,
                        marginTop: 10,
                      }}>
                      <Text style={{ fontWeight: 'bold' }}>
                        Comment from {i.username}:
                      </Text>
                      <Text>{i.comment_content}</Text>
                    </View>
                  );
                })
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
          value={newCmt}
          onChangeText={setNewCmt}
          placeholder="Type something..."
          style={{
            backgroundColor: colors.white,
            width: ScreenWidth - 100,
            paddingLeft: 10,
          }}
        />
        <TouchableOpacity
          onPress={sendComment}
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
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default EventDetail;
