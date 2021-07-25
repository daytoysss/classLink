import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/constants';

type Props = {
  navigation: any;
  title: string;
};

const Header: React.FC<Props> = ({ navigation, title }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 50,
        backgroundColor: colors.background,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          color: colors.title,
        }}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{
          position: 'absolute',
          left: 10,
          top: 5,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather
          name="menu"
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
