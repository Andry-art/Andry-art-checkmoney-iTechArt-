import React from 'react';
import {View, StyleSheet} from 'react-native';
import OnBording from './components/OnBording';

const App = () => {
  return (
    <View style={styles.container}>
      <OnBording />
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
