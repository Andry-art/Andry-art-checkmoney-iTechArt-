import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {getDebitsItemsRequest} from '../../store/actions/debitsActions';
import {useDispatch} from 'react-redux';
import Debits from '../debits/Debits';
import NewDebits from '../debits/NewDebits';
import DebitInfo from '../debits/DebitInfo';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LogOutModal from '../../components/LogOutModal';
import logOutSource from '../../../Pics/logout.png';

const Stack = createNativeStackNavigator();

const DebitNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemWallet());
    dispatch(getDebitsItemsRequest());
  }, [dispatch]);

  const [isVisible, setIsVisible] = useState(false);

  const logOutRequest = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Debits"
        component={Debits}
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
        name="Add New Debit"
        component={NewDebits}
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
        name="Debit Info"
        component={DebitInfo}
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

export default DebitNavigation;
