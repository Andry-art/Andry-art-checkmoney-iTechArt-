import React, {FC, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import PasswordInvisibleSource from '../../../pictures/passwordUnvisible.png';
import PasswordVisibleSource from '../../../pictures/passwordVisible.png';
import ButtonApp from '../ButtonApp';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {userLogIn} from '../../store/actions/RegistrationActions';
import {logInError} from '../../store/selectors/registration';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegistrationNavigation} from '../../types/types';

const logInSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const initialValues = {email: '', password: ''};

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}

const LogIn: FC<Props> = ({navigation}) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);
  const dispatch = useDispatch();

  const error = useSelector(logInError);

  const passwordVisibility = useCallback(() => {
    setVisiblePass(prev => !prev);
  }, []);

  const goToSignUpScreen = () => {
    navigation.navigate('SignIn');
  };

  const onSubmit = useCallback(
    (values: {email: string; password: string}) => {
      const email = values.email;
      const password = values.password;
      dispatch(userLogIn({email, password}));
    },
    [dispatch],
  );

  if (error) {
    Alert.alert(error);
  }

  return (
    <View style={styles.backGround}>
      <Text style={styles.title}>LOG IN</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={logInSchema}
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

            <TouchableOpacity
              disabled={!(isValid && dirty)}
              style={!(isValid && dirty) ? styles.logInDisabled : styles.logIn}
              onPress={handleSubmit}>
              <Text style={styles.logInText}> LOG IN </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <ButtonApp
        label="SIGN UP"
        styleBtn={styles.signUp}
        styleTxt={styles.signUpText}
        onPress={goToSignUpScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
  },

  label: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: 'black',
    marginBottom: 3,
  },
  input: {
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

  logIn: {
    width: '100%',
    height: 80,
    backgroundColor: '#404CB2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  logInDisabled: {
    width: '100%',
    height: 80,
    backgroundColor: '#404CB2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    opacity: 0.8,
  },

  logInText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },

  signUp: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpText: {
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
