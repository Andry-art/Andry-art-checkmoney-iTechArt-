import React from 'react';
import {View, StyleSheet} from 'react-native';
import OnBoarding from './src/onBoardingPages/OnBoarding';

const App = () => {
  return (
    <View style={styles.container}>
      <OnBoarding />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
