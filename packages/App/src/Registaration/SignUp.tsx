import React, {FC, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInvisibleSource from '../../Pics/passwordUnvisible.png';
import PasswordVisibleSource from '../../Pics/passwordVisible.png';
import ButtonApp from '../components/ButtonApp';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {userSignUp} from '../store/actions/registration';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegistrationNavigation} from '../types/types';

const signUpSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password is not the same'),
});

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}

const initialValues = {email: '', password: '', repeatPassword: ''};

const LogIn: FC<Props> = ({navigation}) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);
  const [visibleRepeatPass, setVisibleRepeatPass] = useState<boolean>(true);
  const dispatch = useDispatch();

  const passwordVisibility = useCallback(() => {
    setVisiblePass(prev => !prev);
  }, []);

  const repeatPasswordVisibility = useCallback(() => {
    setVisibleRepeatPass(prev => !prev);
  }, []);

  const goToLogInScreen = () => {
    navigation.navigate('LogIn');
  };

  const onSubmit = useCallback(
    (values: {email: string; password: string}) => {
      const email = values.email;
      const password = values.password;
      dispatch(userSignUp({email, password}));
    },
    [dispatch],
  );

  return (
    <View style={styles.backGround}>
      <Text style={styles.welcome}>SIGN UP</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}>
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
              <Text style={styles.labels}>Email</Text>
              <TextInput
                style={styles.inputs}
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
              <Text style={styles.labels}>Password</Text>

              <TextInput
                style={styles.inputs}
                onChangeText={handleChange('password')}
                value={values.password}
                textContentType="password"
                secureTextEntry={visiblePass}
                onBlur={handleBlur('password')}
              />
              <TouchableOpacity onPress={passwordVisibility}>
                <Image
                  source={
                    visiblePass
                      ? PasswordInvisibleSource
                      : PasswordVisibleSource
                  }
                  style={styles.passwordIcon}
                />
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputArea}>
              <Text style={styles.labels}>Repeat password</Text>
              <TextInput
                style={styles.inputs}
                onChangeText={handleChange('repeatPassword')}
                textContentType="password"
                secureTextEntry={visibleRepeatPass}
                value={values.repeatPassword}
                onBlur={handleBlur('repeatPassword')}
              />
              <TouchableOpacity onPress={repeatPasswordVisibility}>
                <Image
                  source={
                    visibleRepeatPass
                      ? PasswordInvisibleSource
                      : PasswordVisibleSource
                  }
                  style={styles.passwordIcon}
                />
              </TouchableOpacity>
              {touched.repeatPassword && errors.repeatPassword && (
                <Text style={styles.error}>{errors.repeatPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              disabled={!(isValid && dirty)}
              style={
                !(isValid && dirty) ? styles.signUpDisabled : styles.signUp
              }
              onPress={handleSubmit}>
              <Text style={styles.signUpText}> SIGN UP </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <ButtonApp
        label="LOG IN"
        styleBtn={styles.logIn}
        styleTxt={styles.logInText}
        onPress={goToLogInScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  welcome: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },

  labels: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: 'black',
    marginBottom: 3,
  },
  inputs: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#404CB2',
    padding: 10,
    borderRadius: 8,
  },

  inputArea: {
    marginBottom: 10,
    width: '100%',
  },

  signUp: {
    width: '100%',
    height: 80,
    backgroundColor: '#404CB2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  signUpDisabled: {
    width: '100%',
    height: 80,
    backgroundColor: '#404CB2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    opacity: 0.8,
  },

  signUpText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },

  logIn: {
    width: '100%',
    height: 50,
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
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#404CB2',
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
