import React, {FC} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

interface Props {
  label: string;
  secur?: boolean;
}

const Input: FC<Props> = ({label, secur}) => {
  return (
    <View style={styles.inputArea}>
      <Text style={styles.labels}>{label}</Text>
      <TextInput
        style={styles.inputs}
        // textContentType={content}
        secureTextEntry={secur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    width: '100%',
  },

  labels: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FDFDFD',
    marginBottom: 3,
  },

  inputs: {
    backgroundColor: '#EFF3F3',
    padding: 10,
    borderRadius: 8,
  },

  passwordIcon: {
    position: 'absolute',
    right: 15,
    bottom: 18,
  },
});

export default Input;
