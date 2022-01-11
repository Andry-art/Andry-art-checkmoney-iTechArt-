import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wallet from './Wallet';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {getDebitsItemsRequest} from '../../store/actions/debitsActions';
import {useDispatch, useSelector} from 'react-redux';
import NewCard from './NewCard';
import AddMonetaryMovements from './AddMonetaryMovements';
import CorrectTransaction from './CorrectTransaction';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import logOutSource from '../../../Pics/logout.png';
import LogOutModal from '../../components/LogOutModal';
import {userIsLogIn} from '../../store/selectors/registration';

const Stack = createNativeStackNavigator();

const BalanceNavigation = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(userIsLogIn);
  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
  }, [dispatch, isLogIn]);

  const [isVisible, setIsVisible] = useState(false);

  const logOutRequest = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallets"
        component={Wallet}
        options={{
          headerStyle: {backgroundColor: '#7CD0FF'},
          headerRight: () => (
            <TouchableOpacity style={styles.logOut} onPress={logOutRequest}>
              <Image source={logOutSource} />
              <LogOutModal
                isModalVisible={isVisible}
                setIsVisible={setIsVisible}
                logOutRequest={logOutRequest}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="New Card"
        component={NewCard}
        options={{
          headerStyle: {backgroundColor: '#7CD0FF'},
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
          headerStyle: {backgroundColor: '#7CD0FF'},
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
          headerStyle: {backgroundColor: '#7CD0FF'},
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

export default BalanceNavigation;