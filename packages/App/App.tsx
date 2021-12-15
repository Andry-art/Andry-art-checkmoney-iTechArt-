import React, {useEffect, useState} from 'react';
import OnBoarding from './src/onBoardingPages/OnBoarding';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SomeScrin from './src/SomeScrin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet} from 'react-native';
import Loading from './src/Loading';

// const Stack = createNativeStackNavigator();

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
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : viewOnBoarding ? (
        <SomeScrin />
      ) : (
        <OnBoarding setViewOnBoarding={setViewOnBoarding} />
      )}
    </View>
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
