import React, {useEffect, useState} from 'react';
import OnBoarding from './src/onBoardingPages/OnBoarding';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/components/Loading';
import Balance from './src/Balance';
import LogIn from './src/Registaration/LogIn';
import SignUp from './src/Registaration/SignUp';

import {useSelector} from 'react-redux';

interface Registration {
  isLogIn: boolean;
  isLoading: boolean;
  error: string;
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewOnBoarding, setViewOnBoarding] = useState(false);

  const userIsLogIn = useSelector(state => state.registration.isLogIn);

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

  if (loading) {
    return <Loading />;
  }
  if (!viewOnBoarding) {
    return <OnBoarding setViewOnBoarding={setViewOnBoarding} />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!userIsLogIn && (
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
            </>
          )}
          <Stack.Screen name="Balance" component={Balance} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
