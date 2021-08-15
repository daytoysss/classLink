import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux-toolkit/hook';
import { TabParams } from '../../types/TabParams';
import { baseURL, colors } from '../../utils/constants';
import Feather from 'react-native-vector-icons/Feather';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);
  console.log(userInfor);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    if (!title || !content || !userInfor.user_id) {
      Alert.alert('ClassLink', 'Both title and content are required!');
    } else {
      try {
        const res = await axios.post(baseURL + 'posts', {
          user_id: userInfor.user_id,
          post_title: title,
          post_content: content,
        });
        if (res.data.status !== 'success') {
          Alert.alert('ClassLink', res.data.message);
        } else {
          setLoading(true);
          setTitle('');
          setContent('');
          await getData();
        }
      } catch (err) {
        Alert.alert('ClassLink', JSON.stringify(err.response));
      }
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(baseURL + 'posts');
      // console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="ClassLink"
        isBackable={false}
        rightButtonTitle="Log Out"
      />
      {role === 'teacher' && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              height: 200,
              backgroundColor: colors.white,
              borderColor: colors.black,
              borderRadius: 20,
              borderWidth: 0.5,
              margin: 10,
            }}>
            <TextInput
              placeholder="Title.."
              value={title}
              onChangeText={setTitle}
              style={{
                fontSize: 20,
                paddingLeft: 20,
                paddingTop: 20,
                height: 50,
                borderBottomWidth: 0.5,
                borderColor: colors.black,
              }}
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Content.."
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4}
              style={{
                fontSize: 20,
                paddingLeft: 20,
                paddingTop: 20,
                height: 100,
                borderBottomWidth: 0.5,
                borderColor: colors.black,
              }}
            />
            <View
              style={{
                height: 50,
                paddingHorizontal: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                }}>
                {/* <Text>Add</Text> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreatePost}>
                <Text>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginVertical: 10,
          height: 40,
        }}>
        Incoming events
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          {posts.length === 0 ? (
            <Text>No posts!</Text>
          ) : (
            <FlatList
              keyExtractor={item => item?.post_id ?? ''}
              data={posts}
              extraData={posts}
              renderItem={({ item }: any) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      RootNavigation.navigate('EventDetail', { item })
                    }
                    key={item.post_id}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 10,
                      padding: 20,
                      marginTop: 20,
                      position: 'relative',
                    }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                      {item?.post_title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                      }}>
                      {new Date(item?.created_at).toDateString().slice(4, 10)}
                    </Text>
                    <Text>{item?.post_content}</Text>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'red',
                        borderRadius: 20,
                      }}>
                      <Feather name="trash-2" size={20} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{
                flexGrow: 1,
                marginHorizontal: 20,
                paddingBottom: 150,
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.homeBgc,
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
});

export default HomeScreen;
