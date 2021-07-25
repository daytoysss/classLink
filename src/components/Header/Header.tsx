import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  navigation: any;
};

const Header: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 50,
      }}>
      <Text>ClassLink</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{
          position: 'absolute',
          left: 10,
          top: 5,
          width: 40,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather
          name="menu"
          style={{
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
