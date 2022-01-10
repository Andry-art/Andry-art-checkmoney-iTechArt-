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
} from '../../store/selectors/debits';
import {useDispatch, useSelector} from 'react-redux';
import {DebitInfo, DebitNavigatorList} from '../../types/types';
import {
  addDebitInfo,
  deleteDebitRequest,
} from '../../store/actions/debitsActions';
import CardModal from '../../components/CardModal';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleMinus, setModalVisibleMinus] = useState<boolean>(false);

  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const sumDebToYou = useSelector(sumDebitsToYou);
  const sumOfYourDeb = useSelector(sumOfYourDebits);
  const info = useSelector(debitInfo);
  let wallet = useSelector(walletName);
  const addDebitError = useSelector(newDebitError);
  const deleteError = useSelector(deleteDebitError);

  useEffect(() => {
    if (addDebitError) {
      Alert.alert(addDebitError);
    }
    if (deleteError) {
      Alert.alert(deleteError);
    }
  }, [addDebitError, deleteError]);

  const DebitsToYou = useCallback(() => {
    setDebitsVisible(prev => !prev);
    setMyDebitsVisible(false);
  }, []);

  const myDebits = () => {
    setMyDebitsVisible(prev => !prev);
    setDebitsVisible(false);
  };

  const toNewDebits = () => {
    navigation.navigate('Add New Debit');
  };

  const showModal = useCallback(
    ({type, keyOfWallet, key, date, person, amount}: DebitInfo) => {
      setModalVisible(true);
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
    },
    [dispatch],
  );

  const hide = useCallback(() => {
    setModalVisible(false);
    setModalVisibleMinus(false);
  }, []);

  const deleteDebitMinus = () => {
    let debitsArray;
    if (info.type === 'your debit') {
      debitsArray = yourDebits;
    }

    if (info.type === 'debit to you') {
      debitsArray = toYou;
    }

    if (wallet && debitsArray) {
      dispatch(
        deleteDebitRequest({wallet: wallet, debit: info, array: debitsArray}),
      );
      navigation.goBack();
      dispatch(getAllItemWallet());
    }
  };

  const deleteDebit = () => {
    let debitsArray;
    if (info.type === 'your debit') {
      debitsArray = yourDebits;
    }

    if (info.type === 'debit to you') {
      debitsArray = toYou;
    }

    if (wallet) {
      if (info.type === 'debit to you') {
        wallet = {
          ...wallet,
          walletAmount: wallet.walletAmount + info.amount,
        };
      }
      if (info.type === 'your debit') {
        wallet = {
          ...wallet,
          walletAmount: wallet.walletAmount - info.amount,
        };
      }

      if (wallet?.walletAmount < 0) {
        setModalVisibleMinus(true);
      }
    }

    if (wallet && debitsArray && wallet?.walletAmount > 0) {
      dispatch(
        deleteDebitRequest({wallet: wallet, debit: info, array: debitsArray}),
      );
      setModalVisible(false);
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
      <CardModal
        title=" Would you like to delete debit?"
        isVisible={modalVisible}
        onPressDelete={deleteDebit}
        onPressHide={hide}
      />

      <CardModal
        title="Going to be minus?"
        isVisible={modalVisibleMinus}
        onPressDelete={deleteDebitMinus}
        onPressHide={hide}
      />

      <TouchableOpacity
        style={debitsVisible ? styles.debitsActive : styles.debits}
        onPress={DebitsToYou}>
        <Text style={styles.title}>Debits to you</Text>
        <Text style={styles.titleAmount}>{sumDebToYou}$</Text>
      </TouchableOpacity>
      {debitsVisible && (
        <ScrollView>
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
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={myDebitsVisible ? styles.yourDebitsActive : styles.yourDebits}
        onPress={myDebits}>
        <Text style={styles.titleYourDeb}>Your debits</Text>
        <Text style={styles.titleAmountYourDeb}>{sumOfYourDeb}$</Text>
      </TouchableOpacity>

      {myDebitsVisible && (
        <ScrollView>
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
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addNewDebit} onPress={toNewDebits}>
        <Text style={styles.titleAddNew}>Add New</Text>
      </TouchableOpacity>
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
    height: 55,
    backgroundColor: '#7CD0FF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  debits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  yourDebitsActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#7CD0FF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  yourDebits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'green',
    fontSize: 18,
  },

  titleYourDeb: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'red',
    fontSize: 18,
  },

  titleAmount: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'green',
    fontSize: 18,
  },

  titleAmountYourDeb: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'red',
    fontSize: 18,
  },
  listDebits: {
    padding: 0,
  },

  titleAddNew: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    color: '#23A7F1',
  },

  addNewDebit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: 55,
    borderRadius: 30,
    borderColor: '#23A7F1',
    marginTop: 20,
    width: '100%',
    marginBottom: 80,
  },
});

export default Debits;
