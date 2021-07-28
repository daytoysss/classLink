import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { HomeStackParamsList } from '../../types/HomeParamsList';
import { TabParams } from '../../types/TabParams';
import { colors } from '../../utils/constants';

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
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="View report" isBackable={false} />
      <FlatList
        style={{
          marginTop: 50,
        }}
        data={listStudent}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              RootNavigation.navigate('Main', {
                screen: 'Report',
                params: {
                  name: item.name,
                },
              })
            }
            style={{
              width: '50%',
              marginBottom: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="stretch"
              style={{
                width: 100,
                height: 100,
                borderRadius: 500,
              }}
              source={{
                uri: item.avatar,
              }}
            />
          </TouchableOpacity>
        )}
      />
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
});

export default Summary;
