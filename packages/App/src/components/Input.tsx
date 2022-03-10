import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import PasswordInvisibleSource from '../../pictures/passwordUnvisible.png';
import PasswordVisibleSource from '../../pictures/passwordVisible.png';
import {textType} from '../types/types';

type Props = {
  onChangeText: (e: string | ChangeEvent<string>) => void;
  value: string;
  textContentType?: textType;
  keyboardType?: KeyboardTypeOptions | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errors: string | undefined;
  isPassword: boolean;
  touched?: boolean | undefined;
  placeholder?: string;
  contextMenuHidden?: boolean;
  isRegistration?: boolean;
};

const Input: FC<Props> = ({
  onChangeText,
  value,
  textContentType = 'none',
  keyboardType,
  onBlur,
  errors,
  isPassword,
  touched,
  placeholder,
  contextMenuHidden,
  isRegistration,
}) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);

  const passwordVisibility = useCallback(() => {
    setVisiblePass(prev => !prev);
  }, []);
  return (
    <View>
      <TextInput
        style={isRegistration ? styles.input : styles.amountInput}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        textContentType={textContentType}
        secureTextEntry={isPassword ? visiblePass : false}
        onBlur={onBlur}
        placeholder={placeholder}
        contextMenuHidden={contextMenuHidden}
      />
      {isPassword && (
        <TouchableOpacity onPress={passwordVisibility}>
          <Image
            source={
              visiblePass ? PasswordInvisibleSource : PasswordVisibleSource
            }
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      )}
      {(touched || errors) && <Text style={styles.error}>{errors}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#404CB2',
    padding: 10,
    borderRadius: 8,
  },

  error: {
    color: 'red',
  },

  passwordIcon: {
    position: 'absolute',
    right: 15,
    bottom: 18,
  },

  amountInput: {
    fontSize: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#404CB2',
    marginTop: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default Input;
