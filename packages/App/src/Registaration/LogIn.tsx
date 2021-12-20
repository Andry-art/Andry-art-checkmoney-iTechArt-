import React, {FC, useState, useContext} from 'react';
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
import {Formik} from 'formik';
import * as yup from 'yup';

const logInSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const LogIn: FC = ({navigation}: any) => {
  const HTTP = useContext(Context);

  const [visiblePass, setVisiblePass] = useState<boolean>(true);

  const logIn = async (emailReg: string, passwordReg: string) => {
    const response = await HTTP.auth(
      'http://localhost:8000/auth/login',
      emailReg,
      passwordReg,
    );
    console.log(response);
  };

  const signUpPage = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ImageBackground style={styles.backGround} source={BG}>
      <Text style={styles.title}>Log In</Text>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={logInSchema}
        onSubmit={values => {
          logIn(values.email, values.password);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <View style={styles.inputArea}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
                textContentType="emailAddress"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputArea}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                value={values.password}
                textContentType="password"
                secureTextEntry={visiblePass}
                onBlur={handleBlur('password')}
              />
              <TouchableOpacity
                onPress={() => setVisiblePass((prev: boolean) => !prev)}>
                <Image
                  source={visiblePass ? passwordUnvisible : passwordVisible}
                  style={styles.passwordIcon}
                />
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              disabled={!(isValid && dirty)}
              style={!(isValid && dirty) ? styles.logInDisabled : styles.logIn}
              onPress={handleSubmit}>
              <Text style={styles.logInText}> Log In </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <ButtonApp
        label="Sign Up"
        styleBtn={styles.signUp}
        styleTxt={styles.signUpText}
        func={() => signUpPage()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FDFDFD',
    marginBottom: 10,
  },

  label: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FDFDFD',
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#EFF3F3',
    padding: 10,
    borderRadius: 8,
  },

  inputArea: {
    marginBottom: 10,
    width: '100%',
  },

  logIn: {
    width: '100%',
    height: 50,
    backgroundColor: '#BDE7FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  logInDisabled: {
    width: '100%',
    height: 50,
    backgroundColor: '#BDE7FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    opacity: 0.8,
  },

  logInText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#1D424F',
  },

  signUp: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpText: {
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

  error: {
    color: 'red',
  },
});

export default LogIn;
