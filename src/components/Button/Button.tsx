import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, ScreenWidth } from '../../utils/constants';

type Props = {
  title: string;
  onPress: () => void;
};

const Screen: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress ?? null}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.buttonNewClass,
    paddingHorizontal: 30,
    marginHorizontal: ScreenWidth / 2 - 120,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Screen;
