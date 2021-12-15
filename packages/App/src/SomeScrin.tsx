import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import BG from '../Pics/Group32.png';
import passwordUnvisible from '../Pics/passwordUnvisible.png';
import passwordVisible from '../Pics/passwordVisible.png';
import HttpService from '@checkmoney/core';

const SomeScrin: FC = () => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);
  const [visibleRepeatPass, setVisibleRepeatPass] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  let www = new HttpService(
    fetch,
    () => {},
    () => {},
  );

  const qqq = www.auth(
    'http://localhost:8000/auth/login',
    'bruno@email.com',
    'bruno',
  );

  console.log(www);

  // const cleanStore = () => {
  //   try {
  //     AsyncStorage.removeItem('@viewedOnBoarding');
  //   } catch {
  //     console.log('ssss');
  //   }
  // };

  return (
    <ImageBackground style={styles.backGround} source={BG}>
      <Text style={styles.welcome}>Welcome</Text>

      <View style={styles.inputArea}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={setEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.labels}>Password</Text>

        <TextInput
          style={styles.inputs}
          onChangeText={setPassword}
          textContentType="password"
          secureTextEntry={visiblePass}
        />
        <TouchableOpacity onPress={() => setVisiblePass(prev => !prev)}>
          <Image
            source={visiblePass ? passwordUnvisible : passwordVisible}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.labels}>Repeat password</Text>
        <TextInput
          style={styles.inputs}
          textContentType="password"
          secureTextEntry={visibleRepeatPass}
        />
        <TouchableOpacity onPress={() => setVisibleRepeatPass(prev => !prev)}>
          <Image
            source={visibleRepeatPass ? passwordUnvisible : passwordVisible}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signIn}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logIn}>
        <Text style={styles.logInText}>LogIn</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={cleanStore}>
        <Text>Clean</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  welcome: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FDFDFD',
    marginBottom: 10,
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

  inputArea: {
    marginBottom: 10,
    width: '100%',
  },

  signIn: {
    width: '100%',
    height: 50,
    backgroundColor: '#BDE7FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  signInText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#1D424F',
  },

  logIn: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logInText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  passwordIcon: {
    position: 'absolute',
    right: 15,
    bottom: 18,
  },
});

export default SomeScrin;
