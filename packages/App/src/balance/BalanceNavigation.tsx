import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Balance from './Balance';
import Wallet from './wallet/Wallet';
import {getAllItemWallet} from '../store/actions/walletActions';
import {getDebitsItemsRequest} from '../store/actions/debitsActions';
import {useDispatch} from 'react-redux';
import NewCard from './wallet/NewCard';
import AddMonetaryMovements from './wallet/AddMonetaryMovements';
import CorrectTransaction from './wallet/CorrectTransaction';
import Debits from './debits/Debits';
import NewDebits from './debits/NewDebits';
import DebitInfo from './debits/DebitInfo';

const Stack = createNativeStackNavigator();

const BalanceNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
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
      <Stack.Screen
        name="NewCard"
        component={NewCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addMonetaryMovements"
        component={AddMonetaryMovements}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="correctTransaction"
        component={CorrectTransaction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Debits"
        component={Debits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewDebits"
        component={NewDebits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DebitInfo"
        component={DebitInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BalanceNavigation;
