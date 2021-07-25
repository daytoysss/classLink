import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/constants';

type Props = {
  navigation?: any;
  title: string;
  isBackable: boolean;
};

const Header: React.FC<Props> = ({ navigation, title, isBackable }) => {
  const RootNavigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isBackable ? (
        <TouchableOpacity
          onPress={() => {
            navigation ? navigation.goBack() : RootNavigation.goBack();
          }}
          style={styles.button}>
          <Feather name="arrow-left" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            RootNavigation.dispatch(DrawerActions.openDrawer());
          }}
          style={styles.button}>
          <Feather name="menu" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 50,
    backgroundColor: colors.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.title,
  },
  button: {
    position: 'absolute',
    left: 10,
    top: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Header;
