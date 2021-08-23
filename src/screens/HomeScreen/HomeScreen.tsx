import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Modal,
  SafeAreaView,
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
import { baseURL, colors, ScreenWidth } from '../../utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';

type HomeStackProps = BottomTabNavigationProp<TabParams, 'Home'>;

type Props = {
  navigation: HomeStackProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const RootNavigation = useNavigation();
  const role = useAppSelector(state => state.role.role);
  const userInfor = useAppSelector(state => state.user.info);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModalCreatePost, setShowModalCreatePost] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imgLink, setImgLink] = useState('');

  const handleCreatePost = async () => {
    if (!title || !content || !userInfor.user_id) {
      Alert.alert('ClassLink', 'Both title and content are required!');
    } else {
      try {
        const res = await axios.post(baseURL + 'posts', {
          user_id: userInfor.user_id,
          post_title: title,
          post_content: content,
          url_image: imgLink,
        });
        if (res.data.status !== 'success') {
          Alert.alert('ClassLink', res.data.message);
        } else {
          setLoading(true);
          setShowModalCreatePost(false);
          setTitle('');
          setContent('');
          await getData();
        }
      } catch (err) {
        Alert.alert('ClassLink', JSON.stringify(err.response));
      }
    }
  };
  const handleDeletePost = async item => {
    Alert.alert(
      'ClassLink',
      `Are you sure to delete "${item.post_title}"? This action can not be undone.`,
      [
        {
          text: 'YES',
          onPress: async () => {
            console.log(item);
            try {
              const res = await axios.delete(baseURL + 'posts/' + item.post_id);
              if (res.data.status !== 'success') {
                Alert.alert('ClassLink', res.data.message);
              } else {
                setLoading(true);
                await getData();
              }
            } catch (err) {
              Alert.alert('ClassLink', JSON.stringify(err.response));
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  };

  const getData = async () => {
    try {
      const res = await axios.get(baseURL + 'posts');
      console.log(res.data);
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

  const renderCreatePostModal = () => {
    return (
      <Modal
        visible={showModalCreatePost}
        transparent={true}
        animationType="fade">
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}>
            <View
              style={{
                // height: 400,
                width: ScreenWidth - 40,
                backgroundColor: colors.white,
                borderColor: colors.black,
                borderRadius: 20,
                borderWidth: 0.5,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowModalCreatePost(false);
                    setImgLink('');
                    setTitle('');
                    setContent('');
                  }}
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 10,
                  }}>
                  <AntDesign name="close" size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontFamily: 'sans-serif-medium' }}>
                  Add Post
                </Text>
              </View>
              <TextInput
                placeholder="Title.."
                value={title}
                onChangeText={setTitle}
                style={{
                  fontSize: 20,
                  paddingLeft: 20,
                  paddingTop: 20,
                  height: 50,
                  borderTopWidth: 0.5,
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
                  height: 200,
                  borderBottomWidth: 0.5,
                  borderColor: colors.black,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                {loadingImg ? (
                  <ActivityIndicator size="large" color="black" />
                ) : (
                  <>
                    {imgLink.length > 0 && (
                      <Image
                        style={{
                          height: ScreenWidth - 120,
                          width: ScreenWidth - 120,
                        }}
                        resizeMode="cover"
                        source={{
                          uri: imgLink,
                        }}
                      />
                    )}
                  </>
                )}
              </View>
              <View
                style={{
                  height: 50,
                  paddingHorizontal: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.homeBgc,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    launchImageLibrary(
                      {
                        quality: 0.5,
                        mediaType: 'photo',
                        includeBase64: true,
                      },
                      async res => {
                        setLoadingImg(true);
                        const data = res.assets[0];
                        const resp = await axios.post(
                          'https://api.cloudinary.com/v1_1/dh3bemi7h/upload',
                          {
                            file: `data:${data.type};base64,${data.base64}`,
                            upload_preset: 'classlink-qweasd',
                          },
                          {
                            headers: {
                              Authorization: '',
                            },
                          },
                        );
                        console.log('response url', resp);
                        setImgLink(resp.data.secure_url);
                        setLoadingImg(false);
                      },
                    );
                  }}>
                  <Entypo name="image" size={20} />
                  <Text style={{ marginLeft: 10 }}>Add Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.homeBgc,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}
                  onPress={handleCreatePost}>
                  <Text>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="ClassLink"
        isBackable={false}
        rightButtonTitle="Log Out"
      />
      {role === 'teacher' && (
        <>
          {renderCreatePostModal()}
          <TouchableOpacity
            onPress={() => setShowModalCreatePost(true)}
            style={{
              height: 50,
              backgroundColor: colors.white,
              borderColor: colors.black,
              borderRadius: 10,
              borderWidth: 0.5,
              margin: 20,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text style={{ fontFamily: 'monospace' }}>What's new?...</Text>
            <Entypo name="image" size={30} />
          </TouchableOpacity>
        </>
      )}
      <Text
        style={{
          fontSize: 22,
          // fontWeight: 'bold',
          alignSelf: 'center',
          // marginVertical: 10,
          height: 40,
          fontFamily: 'sans-serif-medium',
        }}>
        Incoming Events
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
                      marginBottom: 20,
                      position: 'relative',
                    }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                      {item?.post_title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: 'gray',
                      }}>
                      {new Date(item?.created_at).toDateString().slice(4, 10)}
                    </Text>
                    <Text>{item?.post_content}</Text>
                    {!!item.url_img && (
                      <Image
                        style={{
                          height: ScreenWidth - 120,
                          width: ScreenWidth - 80,
                          marginVertical: 20,
                        }}
                        resizeMode="cover"
                        source={{
                          uri: item.url_img,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => handleDeletePost(item)}
                      style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: colors.homeBgc,
                        borderRadius: 20,
                      }}>
                      <Entypo name="trash" size={20} />
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
