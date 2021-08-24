import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/constants';

const CustomTabbar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 80,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      {state.routes.map((route: any, index: number) => {
        console.log(state.index === index);
        let backgroundColor: string = '';
        let iconSrc = undefined;
        switch (route.name) {
          case 'Home':
            backgroundColor =
              state.index === index ? colors.homeBgc : colors.white;
            iconSrc =
              state.index === index
                ? require('../../assets/home.png')
                : require('../../assets/home-white.png');
            break;
          case 'Classroom':
            backgroundColor =
              state.index === index ? colors.classroomBgc : colors.white;
            iconSrc =
              state.index === index
                ? require('../../assets/classroom.png')
                : require('../../assets/classroom-white.png');
            break;
          case 'Message':
            backgroundColor =
              state.index === index ? colors.messageBgc : colors.white;
            iconSrc =
              state.index === index
                ? require('../../assets/message.png')
                : require('../../assets/message-white.png');
            break;
          case 'Booking':
            backgroundColor =
              state.index === index ? colors.bookingBgc : colors.white;
            iconSrc =
              state.index === index
                ? require('../../assets/booking.png')
                : require('../../assets/booking-white.png');
            break;
          case 'Summary':
            backgroundColor =
              state.index === index ? colors.summaryBgc : colors.white;
            iconSrc =
              state.index === index
                ? require('../../assets/summary.png')
                : require('../../assets/summary-white.png');
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
              borderWidth: 1,
              borderColor: colors.black,
              borderRadius: 2,
            }}>
            <Image
              source={iconSrc}
              resizeMode="stretch"
              style={{
                flex: 2,
                width: 50,
                height: 100,
                opacity: state.index === index ? 1 : 0.3,
              }}
            />
            <Text style={{ flex: 1, opacity: state.index === index ? 1 : 0.8 }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabbar;
