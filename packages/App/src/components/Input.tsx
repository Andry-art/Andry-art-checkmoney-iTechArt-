import React, {FC} from 'react';
import {View, StyleSheet, TextInput, Text, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  label: string;
  change: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<Props> = ({label, change, ...textInputProps}) => {
  return (
    <View style={styles.inputArea}>
      <Text style={styles.labels}>{label}</Text>
      <TextInput
        {...textInputProps}
        style={styles.inputs}
        onChangeText={change}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    width: '100%',
  },

  labels: {
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
