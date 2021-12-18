import React, {FC, useState, useContext, useEffect} from 'react';
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
import BG from '../../Pics/Group32.png';
import passwordUnvisible from '../../Pics/passwordUnvisible.png';
import passwordVisible from '../../Pics/passwordVisible.png';
import ButtonApp from '../components/ButtonApp';
import {Context} from '../../App';
import Input from '../components/Input';

// AsyncStorage.clear();

const SomeScrin: FC = ({setLoginOk}: any) => {
  const HTTP = useContext(Context);

  const [visiblePass, setVisiblePass] = useState<boolean>(true);
  const [visibleRepeatPass, setVisibleRepeatPass] = useState<boolean>(true);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [logInPage, setLogInPage] = useState<boolean>(false);
  const [recoverPassword, setRecoverPassword] = useState<boolean>(false);

  const registration = async (
    emailReg: string,
    passwordReg: string,
    repeatPasswordReg: string,
  ) => {
    if (!logInPage) {
      if (!email) {
        setEmailEmpty(true);
      }
      if (passwordReg !== repeatPasswordReg) {
        setWrongPassword(true);
      }
      if (emailReg && passwordReg === repeatPasswordReg) {
        const response = await HTTP.auth(
          'http://localhost:8000/auth/register',
          emailReg,
          passwordReg,
        );
        setLoginOk(true);
        console.log(response);
      }
    }
    if (logInPage) {
      if (!email) {
        setEmailEmpty(true);
      }
      if (emailReg && passwordReg) {
        const response = await HTTP.auth(
          'http://localhost:8000/auth/login',
          emailReg,
          passwordReg,
        );
        if (response.access_token) {
          setLoginOk(true);
        }
      }
    }
  };

  const handleRecoverPassword = () => {
    if (email) {
      console.log('message sent');
    }
  };

  useEffect(() => {
    setEmailEmpty(false);
    setWrongPassword(false);
    setEmail('');
    setPassword('');
  }, [logInPage, recoverPassword]);

  console.log(password);

  return (
    <ImageBackground style={styles.backGround} source={BG}>
      <Text style={styles.welcome}>
        {recoverPassword
          ? 'Recover password'
          : logInPage
          ? 'Log In'
          : 'Welcome'}
      </Text>

      <View style={styles.inputArea}>
        <Input
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          change={setEmail}
        />
        {emailEmpty && <Text style={styles.warning}>Field is empty</Text>}
      </View>
      {!recoverPassword && (
        <View style={styles.inputArea}>
          <Text style={styles.labels}>Password</Text>

          <TextInput
            style={styles.inputs}
            onChangeText={setPassword}
            value={password}
            textContentType="password"
            secureTextEntry={visiblePass}
            onFocus={() => setWrongPassword(false)}
          />
          <TouchableOpacity onPress={() => setVisiblePass(prev => !prev)}>
            <Image
              source={visiblePass ? passwordUnvisible : passwordVisible}
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {!recoverPassword && !logInPage && (
        <View style={styles.inputArea}>
          <Text style={styles.labels}>Repeat password</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={setRepeatPassword}
            textContentType="password"
            secureTextEntry={visibleRepeatPass}
            value={repeatPassword}
            onFocus={() => setWrongPassword(false)}
          />
          <TouchableOpacity onPress={() => setVisibleRepeatPass(prev => !prev)}>
            <Image
              source={visibleRepeatPass ? passwordUnvisible : passwordVisible}
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
          {wrongPassword && (
            <Text style={styles.warning}>Password is not the same</Text>
          )}
        </View>
      )}

      <ButtonApp
        label={
          recoverPassword
            ? 'Recover password'
            : logInPage
            ? 'Log In'
            : 'Sign in'
        }
        styleBtn={styles.signIn}
        styleTxt={styles.signInText}
        func={
          recoverPassword
            ? () => handleRecoverPassword()
            : () => registration(email, password, repeatPassword)
        }
      />

      {recoverPassword ? (
        <View />
      ) : (
        <ButtonApp
          label={logInPage ? 'Forgot Password' : 'Log In'}
          styleBtn={logInPage ? styles.forgot : styles.logIn}
          styleTxt={logInPage ? styles.logInText : styles.logInText}
          func={
            logInPage
              ? () => setRecoverPassword(true)
              : () => setLogInPage(true)
          }
        />
      )}
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

  forgot: {
    width: '100%',
    height: 50,
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

  warning: {
    color: 'red',
  },
});

export default SomeScrin;
