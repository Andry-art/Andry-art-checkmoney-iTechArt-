import React, {FC} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import ButtonApp from '../ButtonApp';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {userLogIn} from '../../store/actions/RegistrationActions';
import {logInError} from '../../store/selectors/RegistrationSelectors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegistrationNavigation} from '../../types/types';
import Input from '../Input';

const logInSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const initialValues = {email: '', password: ''};

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}

const LogIn: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const error = useSelector(logInError);
  const goToSignUpScreen = () => {
    navigation.navigate('SignIn');
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik<{email: string; password: string}>({
    initialValues: initialValues,
    validationSchema: logInSchema,
    onSubmit: values => {
      const email = values.email;
      const password = values.password;
      dispatch(userLogIn({email, password}));
    },
  });

  if (error) {
    Alert.alert(error);
  }

  return (
    <View style={styles.backGround}>
      <Text style={styles.title}>LOG IN</Text>

      <View style={styles.inputArea}>
        <Text style={styles.label}>Email</Text>
        <Input
          onChangeText={handleChange('email')}
          value={values.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          onBlur={handleBlur('email')}
          errors={errors.email}
          isPassword={false}
          touched={touched.email}
          isRegistration={true}
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.label}>Password</Text>

        <Input
          onChangeText={handleChange('password')}
          value={values.password}
          textContentType="password"
          onBlur={handleBlur('password')}
          errors={errors.password}
          isPassword={true}
          touched={touched.password}
          isRegistration={true}
        />
      </View>

      <ButtonApp
        label="LOG IN"
        disabled={!(isValid && dirty)}
        styleBtn={!(isValid && dirty) ? styles.logInDisabled : styles.logIn}
        styleTxt={styles.logInText}
        onPress={handleSubmit}
      />

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
