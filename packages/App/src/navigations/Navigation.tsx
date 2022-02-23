import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogIn from '../components/registaration/LogIn';
import SignUp from '../components/registaration/SignUp';
import Loading from '../components/Loading';
import {userIsLogIn, IsLoadingUser} from '../store/selectors/RegistrationSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BalanceNavigation from './WalletNavigation';
import DebitNavigation from './DebitNavigation';
import MainStatistic from '../components/statistic/MainStatistic';
import walletImgSource from '../../pictures/balance/wallet.png';
import debitsImgSource from '../../pictures/TabMenu/money.png';
import mapImgSource from '../../pictures/TabMenu/location.png';
import statsImgSource from '../../pictures/TabMenu/bar-chart.png';
import logOutSource from '../../pictures/logout.png';
import {getAllItemWallet} from '../store/actions/RalletActions';
import OnBoarding from '../components/onBoardingPages/OnBoarding';
import AsyncStorage from '@react-native-community/async-storage';
import {logOutAction} from '../store/actions/RegistrationActions';
import Map from '../components/map/Map';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(userIsLogIn);
  const isLoading = useSelector(IsLoadingUser);

  const [ViewOnBoarding, setViewOnBoarding] = useState(true);
  const [loadingOnboarding, setLoadingOnBoarding] = useState(true);

  const checkOnboardingPage = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnBoarding');
      if (value === null) {
        setLoadingOnBoarding(false);
        setViewOnBoarding(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOnBoarding(false);
    }
  };

  useEffect(() => {
    checkOnboardingPage();
  }, []);

  useEffect(() => {
    dispatch(getAllItemWallet());
  }, [dispatch]);

  const logOutRequest = () => {
    Alert.alert('Would you like to logOut?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        onPress: async () => {
          dispatch(logOutAction());
        },
      },
    ]);
  };

  if (isLoading || loadingOnboarding) {
    return <Loading />;
  }

  if (!ViewOnBoarding) {
    return <OnBoarding setViewOnBoarding={setViewOnBoarding} />;
  }

  return (
    <NavigationContainer>
      {!isLogIn ? (
        <Stack.Navigator>
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
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="WalletMenu"
            component={BalanceNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View style={styles.iconArea}>
                  <Image
                    source={walletImgSource}
                    style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#404CB2' : '#C0C0C0'},
                    ]}>
                    Wallets
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="DebitsMenu"
            component={DebitNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View style={styles.iconArea}>
                  <Image
                    source={debitsImgSource}
                    style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#404CB2' : '#C0C0C0'},
                    ]}>
                    Debits
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Statistic"
            component={MainStatistic}
            options={{
              headerStyle: {backgroundColor: '#FFFFFF'},
              headerRight: () => (
                <TouchableOpacity style={styles.logOut} onPress={logOutRequest}>
                  <Image source={logOutSource} />
                </TouchableOpacity>
              ),
              tabBarIcon: ({focused}) => (
                <View style={styles.iconArea}>
                  <Image
                    source={statsImgSource}
                    style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#404CB2' : '#C0C0C0'},
                    ]}>
                    Stats
                  </Text>
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              headerStyle: {backgroundColor: '#FFFFFF'},
              tabBarIcon: ({focused}) => (
                <View style={styles.iconArea}>
                  <Image
                    source={mapImgSource}
                    style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#404CB2' : '#C0C0C0'},
                    ]}>
                    Map
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },

  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    width: 50,
  },

  iconArea: {
    alignItems: 'center',
  },
  logOut: {
    paddingRight: 10,
  },
});

export default Navigation;
