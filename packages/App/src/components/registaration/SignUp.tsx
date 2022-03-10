import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ButtonApp from '../ButtonApp';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {userSignUp} from '../../store/actions/RegistrationActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegistrationNavigation} from '../../types/types';
import Input from '../Input';

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
  const dispatch = useDispatch();

  const goToLogInScreen = () => {
    navigation.navigate('LogIn');
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
  } = useFormik<{email: string; password: string; repeatPassword: string}>({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: values => {
      const email = values.email;
      const password = values.password;
      dispatch(userSignUp({email, password}));
    },
  });

  return (
    <View style={styles.backGround}>
      <Text style={styles.welcome}>SIGN UP</Text>

      <View style={styles.inputArea}>
        <Text style={styles.labels}>Email</Text>
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
        <Text style={styles.labels}>Password</Text>
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

      <View style={styles.inputArea}>
        <Text style={styles.labels}>Repeat password</Text>
        <Input
          onChangeText={handleChange('repeatPassword')}
          value={values.repeatPassword}
          textContentType="password"
          onBlur={handleBlur('repeatPassword')}
          errors={errors.repeatPassword}
          isPassword={true}
          touched={touched.repeatPassword}
          isRegistration={true}
        />
      </View>

      <ButtonApp
        label="SIGN UP"
        disabled={!(isValid && dirty)}
        styleBtn={!(isValid && dirty) ? styles.signUpDisabled : styles.signUp}
        styleTxt={styles.signUpText}
        onPress={handleSubmit}
      />

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
