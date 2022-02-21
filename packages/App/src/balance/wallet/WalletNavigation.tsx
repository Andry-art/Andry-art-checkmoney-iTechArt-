import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wallet from './Wallet';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {getDebitsItemsRequest} from '../../store/actions/debitsActions';
import {useDispatch, useSelector} from 'react-redux';
import NewCard from './NewCard';
import AddMonetaryMovements from './AddMonetaryMovements';
import CorrectTransaction from './CorrectTransaction';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import logOutSource from '../../../Pics/logout.png';
import {userIsLogIn} from '../../store/selectors/registration';
import {logOutAction} from '../../store/actions/registration';

const Stack = createNativeStackNavigator();

const BalanceNavigation = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(userIsLogIn);

  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
  }, [dispatch, isLogIn]);

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
        name="Wallets"
        component={Wallet}
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
        name="New Card"
        component={NewCard}
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
        name="Add Transaction"
        component={AddMonetaryMovements}
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
        name="Correct Transaction"
        component={CorrectTransaction}
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

  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default BalanceNavigation;
