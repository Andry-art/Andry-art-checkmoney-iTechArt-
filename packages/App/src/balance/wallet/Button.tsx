import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const Button = ({title, picture}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Image source={picture} />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#C7F8FF',
    padding: 20,
    borderRadius: 10,
  },
});

export default Button;
