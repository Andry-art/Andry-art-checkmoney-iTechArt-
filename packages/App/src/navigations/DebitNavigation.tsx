import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAllItemWallet} from '../store/actions/WalletActions';
import {getDebitsItemsRequest} from '../store/actions/DebitsActions';
import {useDispatch} from 'react-redux';
import Debits from '../components/debits/Debits';
import NewDebits from '../components/debits/NewDebits';
import DebitInfoComponent from '../components/debits/DebitInfo';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import logOutSource from '../../pictures/logout.png';
import {logOutAction} from '../store/actions/RegistrationActions';

const Stack = createNativeStackNavigator();

const DebitNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
  }, [dispatch]);

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
