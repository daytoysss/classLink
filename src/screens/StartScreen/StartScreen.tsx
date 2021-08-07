import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  navigation: any;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text>hi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Screen;
