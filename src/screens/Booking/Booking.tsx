import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  navigation: undefined;
};

const Screen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text>Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Screen;
