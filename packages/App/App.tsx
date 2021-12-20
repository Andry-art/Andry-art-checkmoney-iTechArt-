import React, {useEffect, useState} from 'react';
import OnBoarding from './src/onBoardingPages/OnBoarding';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Registration from './src/Registaration/Registration';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/components/Loading';
import HttpService from '@checkmoney/core';
import EncryptedStorage from 'react-native-encrypted-storage';
import Balance from './src/Balance';
import LogIn from './src/Registaration/LogIn';
import SignUp from './src/Registaration/SignUp';

const Stack = createNativeStackNavigator();

const getToken = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    return JSON.parse(session || '{}');
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
  const [viewOnBoarding, setViewOnBoarding] = useState(false);

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
      <NavigationContainer>
        {loading ? (
          <Loading />
        ) : (
          <Stack.Navigator>
            {!viewOnBoarding ? (
              <Stack.Screen name="onBoarding" options={{headerShown: false}}>
                {props => (
                  <OnBoarding
                    {...props}
                    setViewOnBoarding={setViewOnBoarding}
                  />
                )}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen
                  name="LogIn"
                  component={LogIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignUp}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="Balance" component={Balance} />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
