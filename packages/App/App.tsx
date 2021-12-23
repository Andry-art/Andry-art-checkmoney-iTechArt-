import React, {useEffect, useState} from 'react';
import OnBoarding from './src/onBoardingPages/OnBoarding';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/components/Loading';
import Navigation from './src/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewOnBoarding, setViewOnBoarding] = useState(true);

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
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
};

export default App;
