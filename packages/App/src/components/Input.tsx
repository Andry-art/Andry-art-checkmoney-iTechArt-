<<<<<<< HEAD
import React, {ChangeEvent, FC} from 'react';
import {View, StyleSheet, TextInput, Text, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  label: string;
  change: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<Props> = ({label, change, ...textInputProps}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    change(e);
  };

=======
import React, {FC} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

interface Props {
  label: string;
  secur?: boolean;
}

const Input: FC<Props> = ({label, secur}) => {
>>>>>>> aa552c8358226dc46b3958003014942e5a6ea604
  return (
    <View style={styles.inputArea}>
      <Text style={styles.labels}>{label}</Text>
      <TextInput
<<<<<<< HEAD
        {...textInputProps}
        style={styles.inputs}
        onChangeText={e => handleChange(e)}
        // textContentType={content}
        // secureTextEntry={secur}
=======
        style={styles.inputs}
        // textContentType={content}
        secureTextEntry={secur}
>>>>>>> aa552c8358226dc46b3958003014942e5a6ea604
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
