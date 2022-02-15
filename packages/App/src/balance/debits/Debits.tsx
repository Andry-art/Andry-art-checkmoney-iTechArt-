import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  Alert,
  ScrollView,
  Image,
  View,
  SafeAreaView
} from 'react-native';
import ListOfDebits from './ListOfDebits';
import {
  getDebitsToYou,
  getYourDebits,
  sumDebitsToYou,
  sumOfYourDebits,
  debitInfo,
  walletName,
  newDebitError,
  deleteDebitError,
  getErrorDebits,
} from '../../store/selectors/debits';
import {useDispatch, useSelector} from 'react-redux';
import {DebitInfo, DebitNavigatorList, DebitType} from '../../types/types';
import {
  addDebitInfo,
  deleteDebitRequest,
} from '../../store/actions/debitsActions';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import arrowSource from '../../../Pics/debt/up-arrow.png';
import plusSource from '../../../Pics/debt/plus.png';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

const Debits: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [debitsVisible, setDebitsVisible] = useState<boolean>(false);
  const [myDebitsVisible, setMyDebitsVisible] = useState<boolean>(false);

  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const sumDebToYou = useSelector(sumDebitsToYou);
  const sumOfYourDeb = useSelector(sumOfYourDebits);
  const info = useSelector(debitInfo);
  let wallet = useSelector(walletName);
  const addDebitError = useSelector(newDebitError);
  const deleteError = useSelector(deleteDebitError);
  const debitsError = useSelector(getErrorDebits);

  const debToYouInitRotate = useSharedValue(0)
  const yourDebInitRotate = useSharedValue(0)

  const debToYouAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${debToYouInitRotate.value}deg` }],
    };
  });

  const yourDebAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${yourDebInitRotate.value}deg` }],
    };
  });

  useEffect(() => {
    if (addDebitError) {
      Alert.alert(addDebitError);
    }
    if (deleteError) {
      Alert.alert(deleteError);
    }
    if (debitsError) {
      Alert.alert(debitsError);
    }
  }, [addDebitError, deleteError, debitsError]);

  const DebitsToYou = useCallback(() => {
    setDebitsVisible(prev => !prev);
    setMyDebitsVisible(false);
   if (debToYouInitRotate.value === 0) {
    debToYouInitRotate.value = withTiming(180)
    yourDebInitRotate.value = withTiming(0)
   } 
   if (debToYouInitRotate.value === 180) {
    debToYouInitRotate.value = withTiming(0)
   }
  }, []);

  const myDebits = () => {
    setMyDebitsVisible(prev => !prev);
    setDebitsVisible(false);

    if (yourDebInitRotate.value === 0) {
      yourDebInitRotate.value = withTiming(180)
      debToYouInitRotate.value = withTiming(0)
     } 
     if (yourDebInitRotate.value === 180) {
      yourDebInitRotate.value = withTiming(0)
     }
  };

  const toNewDebits = () => {
    navigation.navigate('Add New Debit');
  };

  const showModal = ({
    type,
    keyOfWallet,
    key,
    date,
    person,
    amount,
  }: DebitInfo) => {
    dispatch(
      addDebitInfo({
        type,
        keyOfWallet,
        key,
        date,
        person,
        amount,
      }),
    );
    Alert.alert(' Would you like to delete debt?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteDebit();
        },
      },
    ]);
  };

  const deleteDebitMinus = () => {
    let debitsArray;
    if (info.type === DebitType.yourDebit) {
      debitsArray = yourDebits;
    }

    if (info.type === DebitType.toYou) {
      debitsArray = toYou;
    }

    if (wallet && debitsArray) {
      dispatch(
        deleteDebitRequest({wallet: wallet, debit: info, array: debitsArray}),
      );
      dispatch(getAllItemWallet());
    }
  };

  const deleteDebit = () => {
    let debitsArray;
    if (info.type === DebitType.yourDebit) {
      debitsArray = yourDebits;
    }

    if (info.type === DebitType.toYou) {
      debitsArray = toYou;
    }

    if (wallet) {
      if (info.type === DebitType.toYou) {
        wallet = {
          ...wallet,
          walletAmount: wallet.walletAmount + info.amount,
        };
      }
      if (info.type === DebitType.yourDebit) {
        wallet = {
          ...wallet,
          walletAmount: wallet.walletAmount - info.amount,
        };
      }

      if (wallet?.walletAmount < 0) {
        Alert.alert('Going to be minus, delete?', '', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              deleteDebitMinus();
            },
          },
        ]);
      }
    }

    if (wallet && debitsArray && wallet?.walletAmount > 0) {
      dispatch(
        deleteDebitRequest({wallet: wallet, debit: info, array: debitsArray}),
      );
      dispatch(getAllItemWallet());
    }
  };

  const toDebitInfo = useCallback(
    ({type, keyOfWallet, key, date, person, amount}: DebitInfo) => {
      dispatch(
        addDebitInfo({
          type,
          keyOfWallet,
          key,
          date,
          person,
          amount,
        }),
      );
      navigation.navigate('Debit Info');
    },
    [dispatch, navigation],
  );

 

  LayoutAnimation.easeInEaseOut();

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <SafeAreaView >
      <TouchableOpacity
        style={debitsVisible ? styles.debitsActive : styles.debits}
        onPress={DebitsToYou}>
        <Animated.View style={[styles.arrowUp, debToYouAnimated]}>
          <Image source={arrowSource} style={styles.img} />
        </Animated.View>
        <Text style={debitsVisible ? styles.titleActive : styles.title}>
          Debits to you
        </Text>
        <Text
          style={debitsVisible ? styles.titleAmountActive : styles.titleAmount}>
          {sumDebToYou}$
        </Text>
      </TouchableOpacity>
      {debitsVisible && (
        <ScrollView style={styles.listDebits}>
          {toYou.map(item => (
            <ListOfDebits
              key={item.key}
              type={item.type}
              keyOfWallet={item.keyOfWallet}
              keyDeb={item.key}
              date={item.date}
              person={item.person}
              amount={item.amount}
              color="#1B824A"
              onPress={toDebitInfo}
              onLongPress={showModal}
              lastKey={toYou[toYou.length - 1].key}
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={myDebitsVisible ? styles.yourDebitsActive : styles.yourDebits}
        onPress={myDebits}>
        <Animated.View style={[styles.arrowDown, yourDebAnimated]}>
          <Image source={arrowSource} style={styles.img} />
        </Animated.View>
        <Text style={myDebitsVisible ? styles.titleActive : styles.title}>
          Your debits
        </Text>
        <Text
          style={
            myDebitsVisible ? styles.titleAmountActive : styles.titleAmount
          }>
          {sumOfYourDeb}$
        </Text>
      </TouchableOpacity>

      {myDebitsVisible && (
        <ScrollView style={styles.listDebits}>
          {yourDebits.map(item => (
            <ListOfDebits
              key={item.key}
              type={item.type}
              keyOfWallet={item.keyOfWallet}
              keyDeb={item.key}
              date={item.date}
              person={item.person}
              amount={item.amount}
              color="#1B824A"
              onPress={toDebitInfo}
              onLongPress={showModal}
              lastKey={yourDebits[yourDebits.length - 1].key}
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addNewDebit} onPress={toNewDebits}>
        <Image source={plusSource} style={styles.imgBtn} />
        <Text style={styles.titleAddNew}>ADD NEW</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },

  debitsActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 85,
    backgroundColor: '#404CB2',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 10,
    marginTop: 20,
    
  },

  debits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#E9E9E9',
    height: 85,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  yourDebitsActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 85,
    backgroundColor: '#404CB2',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  yourDebits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#E9E9E9',
    height: 85,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#94AFB6',
    fontSize: 18,
  },

  titleActive: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 18,
  },

  titleAmount: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#3D6670',
    fontSize: 18,
  },

  titleAmountActive: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 18,
  },

  listDebits: {
    borderWidth: 2,
    borderColor: '#E9E9E9',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  titleAddNew: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },

  addNewDebit: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 100,
    width: '100%',
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    marginTop: 75,
    marginBottom: 80,
  },

  arrowUp: {
    padding: 15,
    backgroundColor: '#41BE06',
    borderRadius: 100,
  },

  img: {
    tintColor: 'white',
  },

  arrowDown: {
    padding: 15,
    backgroundColor: '#EB1F39',
    borderRadius: 100,
    rotation: 180,
  },

  imgBtn: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
});

export default Debits;
