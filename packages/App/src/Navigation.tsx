import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Balance from './Balance';
import LogIn from './Registaration/LogIn';
import SignUp from './Registaration/SignUp';
import Loading from './components/Loading';
import {userIsLogIn} from './store/selectors/userIsLoged';
import {IsLoadingUser} from './store/selectors/userIsLoading';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isLogIn = useSelector(state => userIsLogIn(state));
  const isLoading = useSelector(state => IsLoadingUser(state));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogIn && (
          <>
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        )}
        <Stack.Screen name="Balance" component={Balance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
