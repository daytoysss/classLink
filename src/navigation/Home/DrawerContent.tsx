import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const Screen: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Screen;
