import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogIn from './Registaration/LogIn';
import SignUp from './Registaration/SignUp';
import Loading from './components/Loading';
import {userIsLogIn, IsLoadingUser} from './store/selectors/registration';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import BalanceNavigation from './balance/wallet/WalletNavigation';
import DebitNavigation from './balance/debits/DebitNavigation';
import MainStatistic from './balance/statistic/MainStatistic';
import walletImgSource from '../Pics/balance/wallet.png';
import debitsImgSource from '../Pics/TabMenu/money.png';
import statsImgSource from '../Pics/TabMenu/bar-chart.png';
import logOutSource from '../Pics/logout.png';
import LogOutModal from './components/LogOutModal';
import {getAllItemWallet} from './store/actions/walletActions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(userIsLogIn);
  const isLoading = useSelector(IsLoadingUser);

  useEffect(() => {
    dispatch(getAllItemWallet());
  }, [dispatch]);

  const [isVisible, setIsVisible] = useState(false);

  const logOutRequest = () => {
    setIsVisible(prev => !prev);
  };

  if (isLoading) {
    return <Loading />;
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
                  <LogOutModal
                    isModalVisible={isVisible}
                    setIsVisible={setIsVisible}
                    logOutRequest={logOutRequest}
                  />
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
    fontFamily: 'Poppins',
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
