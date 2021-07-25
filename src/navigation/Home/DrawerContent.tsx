import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch } from '../../redux-toolkit/hook';
import { setLoginState } from '../../redux-toolkit/authSlice';

const Screen: React.FC<any> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(setLoginState(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AntDesign name="close" style={styles.buttonClose} />
      <TouchableOpacity>
        <Text style={styles.buttonName}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Text style={styles.buttonName}>View</Text>
        <Text style={styles.buttonName}>Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.buttonName}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pinkBgc,
    padding: 20,
    paddingBottom: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonClose: {
    fontSize: 30,
    alignSelf: 'flex-end',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  buttonName: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});

export default Screen;
