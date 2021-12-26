import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Balance from './Balance';
import Wallet from './wallet/Wallet';
import {getAllItemWallet} from '../store/actions/walletActions';
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const BalanceNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemWallet());
  }, [dispatch]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BalanceMenu"
        component={Balance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BalanceWallet"
        component={Wallet}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BalanceNavigation;
