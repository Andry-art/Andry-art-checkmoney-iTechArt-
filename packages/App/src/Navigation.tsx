import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './Registaration/LogIn';
import SignUp from './Registaration/SignUp';
import Loading from './components/Loading';
import {userIsLogIn, IsLoadingUser} from './store/selectors/registration';
import {useSelector} from 'react-redux';

import BalanceNavigation from './balance/BalanceNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isLogIn = useSelector(userIsLogIn);
  const isLoading = useSelector(IsLoadingUser);

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
        <Stack.Screen
          name="Balance"
          component={BalanceNavigation}
          options={{
            headerStyle: {backgroundColor: '#009EB4'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
