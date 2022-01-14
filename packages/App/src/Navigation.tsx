import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogIn from './Registaration/LogIn';
import SignUp from './Registaration/SignUp';
import Loading from './components/Loading';
import {userIsLogIn, IsLoadingUser} from './store/selectors/registration';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import BalanceNavigation from './balance/wallet/WalletNavigation';
import DebitNavigation from './balance/debits/DebitNavigation';
import MainStatistic from './balance/statistic/MainStatistic';
import walletImgSource from '../Pics/TabMenu/creditCard.png';
import debitsImgSource from '../Pics/TabMenu/money.png';
import statsImgSource from '../Pics/TabMenu/bar-chart.png';
import logOutSource from '../Pics/logout.png';
import {getError} from './store/selectors/walletItems';
import {getErrorDebits} from './store/selectors/debits';
import LogOutModal from './components/LogOutModal';
import {getAllItemWallet} from './store/actions/walletActions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(userIsLogIn);
  const isLoading = useSelector(IsLoadingUser);
  const getErrorInfo = useSelector(getError);
  const debitsError = useSelector(getErrorDebits);
  useEffect(() => {
    dispatch(getAllItemWallet());
  }, [dispatch]);

  if (getErrorInfo || debitsError) {
    Alert.alert(getErrorInfo || debitsError);
  }

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
                    style={{tintColor: focused ? '#212858' : '#7CD0FF'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#212858' : '#7CD0FF'},
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
                    style={{tintColor: focused ? '#212858' : '#7CD0FF'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#212858' : '#7CD0FF'},
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
              headerStyle: {backgroundColor: '#7CD0FF'},
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
                    style={{tintColor: focused ? '#212858' : '#7CD0FF'}}
                  />
                  <Text
                    style={[
                      styles.title,
                      {color: focused ? '#212858' : '#7CD0FF'},
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
    position: 'absolute',
    marginHorizontal: 20,
    marginBottom: 10,
    height: 60,
    borderRadius: 30,
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#F6FCFF',
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
