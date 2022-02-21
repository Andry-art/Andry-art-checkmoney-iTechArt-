import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {getDebitsItemsRequest} from '../../store/actions/debitsActions';
import {useDispatch} from 'react-redux';
import Debits from '../debits/Debits';
import NewDebits from '../debits/NewDebits';
import DebitInfoComponent from './DebitInfoComponent';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LogOutModal from '../../components/LogOutModal';
import logOutSource from '../../../Pics/logout.png';
import { logOutAction } from '../../store/actions/registration';

const Stack = createNativeStackNavigator();

const DebitNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
  }, [dispatch]);

  const [isVisible, setIsVisible] = useState(false);

  const logOutRequest = () => {
    Alert.alert('Would you like to logOut?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        onPress: async () => {
          dispatch(logOutAction());
        },
      },
    ]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Debits"
        component={Debits}
        options={{
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerRight: () => (
            <TouchableOpacity style={styles.logOut} onPress={logOutRequest}>
              <Image source={logOutSource} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Add New Debit"
        component={NewDebits}
        options={{
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerRight: () => (
            <TouchableOpacity style={styles.logOut} onPress={logOutRequest}>
              <Image source={logOutSource} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Debit Info"
        component={DebitInfoComponent}
        options={{
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerRight: () => (
            <TouchableOpacity style={styles.logOut} onPress={logOutRequest}>
              <Image source={logOutSource} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logOut: {
    paddingRight: 10,
  },
});

export default DebitNavigation;
