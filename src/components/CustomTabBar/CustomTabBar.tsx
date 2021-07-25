import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/constants';

const CustomTabbar = ({ state, descriptors, navigation }) => {
  console.log(state, descriptors);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      {state.routes.map((route: any, index: number) => {
        let backgroundColor: string = '';
        let iconSrc = undefined;
        switch (route.name) {
          case 'Home':
            backgroundColor = colors.homeBgc;
            iconSrc = require('../../assets/home.png');
            break;
          case 'Classroom':
            backgroundColor = colors.classroomBgc;
            iconSrc = require('../../assets/classroom.png');
            break;
          case 'Booking':
            backgroundColor = colors.bookingBgc;
            iconSrc = require('../../assets/booking.png');
            break;
          case 'Summary':
            backgroundColor = colors.summaryBgc;
            iconSrc = require('../../assets/summary.png');
            break;
        }
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: backgroundColor,
            }}>
            <Image
              source={iconSrc}
              resizeMode="stretch"
              style={{
                flex: 2,
                width: 50,
                height: 100,
              }}
            />
            <Text style={{ flex: 1 }}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabbar;