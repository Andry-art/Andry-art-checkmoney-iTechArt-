import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Balance from './Balance';
import Wallet from './wallet/Wallet';

const Stack = createNativeStackNavigator();

const BalanceNavigation = () => {
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
