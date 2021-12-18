import React, {useEffect, useState} from 'react';
import OnBoarding from './src/onBoardingPages/OnBoarding';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from './src/Registaration/Registration';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet} from 'react-native';
import Loading from './src/Loading';
import HttpService from '@checkmoney/core';
import EncryptedStorage from 'react-native-encrypted-storage';
import Balance from './src/Balance';

const Stack = createNativeStackNavigator();

const getToken = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    return JSON.parse(session);
  } catch (error) {
    console.log('getToken', error);
  }
};

const saveToken = async (data: any) => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
  } catch (error) {
    console.log('saveToken', error);
  }
};

const HTTP = new HttpService(fetch, getToken, saveToken);

export const Context = React.createContext(HTTP);

const getToken = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    return JSON.parse(session);
  } catch (error) {
    console.log('getToken', error);
  }
};

const saveToken = async (data: any) => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
  } catch (error) {
    console.log('saveToken', error);
  }
};

const HTTP = new HttpService(fetch, getToken, saveToken);

export const Context = React.createContext(HTTP);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewOnBoarding, setViewOnBoarding] = useState(true);
  const [loginOk, setLoginOk] = useState(false);

  console.log('111', HTTP);

  console.log('111', HTTP);

  const checkOnBoarding = async () => {
    try {
      // const value = await AsyncStorage.getItem('@viewedOnBoarding');
      // if (value !== null) {
      //   setViewOnBoarding(true);
      // }
    } catch (e) {
      console.log('Error checkOnBoarding', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnBoarding();
  }, []);

  return (
    <Context.Provider value={HTTP}>
      {!loginOk ? (
        <View style={styles.container}>
          {loading ? (
            <Loading />
          ) : viewOnBoarding ? (
            <Registration setLoginOk={setLoginOk} />
          ) : (
            <OnBoarding setViewOnBoarding={setViewOnBoarding} />
          )}
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Balance" component={Balance} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default App;
