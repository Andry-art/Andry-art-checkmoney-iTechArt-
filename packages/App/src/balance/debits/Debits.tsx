import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import ListOfDebits from './ListOfDebits';
import {
  getDebitsToYou,
  getYourDebits,
  sumDebitsToYou,
  sumOfYourDebits,
  debitInfo,
  walletName,
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

const keyExtractorDebitToYou = (it: DebitInfo) => String(it.key);
const keyExtractorYourDebit = (it: DebitInfo) => String(it.key);

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

const Debits: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [debitsVisible, setDebitsVisible] = useState<boolean>(false);
  const [myDebitsVisible, setMyDebitsVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const sumDebToYou = useSelector(sumDebitsToYou);
  const sumOfYourDeb = useSelector(sumOfYourDebits);
  const info = useSelector(debitInfo);
  const wallet = useSelector(walletName);

  const DebitsToYou = useCallback(() => {
    setDebitsVisible(prev => !prev);
    setMyDebitsVisible(false);
  }, []);

  const myDebits = () => {
    setMyDebitsVisible(prev => !prev);
    setDebitsVisible(false);
  };

  const toNewDebits = () => {
    navigation.navigate('NewDebits');
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
  }, []);

  const deleteDebit = useCallback(() => {
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
      setModalVisible(false);
      dispatch(getAllItemWallet());
    }
  }, [dispatch, info, toYou, wallet, yourDebits]);

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
      navigation.navigate('DebitInfo');
    },
    [dispatch, navigation],
  );

  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <CardModal
        title=" Would you like to delete debit?"
        isVisible={modalVisible}
        onPressDelete={deleteDebit}
        onPressHide={hide}
      />
      <TouchableOpacity style={styles.debits} onPress={DebitsToYou}>
        <Text style={styles.title}>Debits to you</Text>
        <Text style={styles.titleAmount}>{sumDebToYou}$</Text>
      </TouchableOpacity>
      {debitsVisible && (
        <View style={styles.listContainer}>
          <FlatList
            data={toYou}
            keyExtractor={keyExtractorDebitToYou}
            renderItem={({item}) => (
              <ListOfDebits
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
            )}
          />
        </View>
      )}

      <TouchableOpacity style={styles.yourDebits} onPress={myDebits}>
        <Text style={styles.title}>Your debits</Text>
        <Text style={styles.titleAmount}>{sumOfYourDeb}$</Text>
      </TouchableOpacity>
      {myDebitsVisible && (
        <View style={styles.listContainer}>
          <FlatList
            data={yourDebits}
            keyExtractor={keyExtractorYourDebit}
            renderItem={({item}) => (
              <ListOfDebits
                type={item.type}
                keyOfWallet={item.keyOfWallet}
                keyDeb={item.key}
                date={item.date}
                person={item.person}
                amount={item.amount}
                color="red"
                onPress={toDebitInfo}
                onLongPress={showModal}
              />
            )}
          />
        </View>
      )}

      <TouchableOpacity style={styles.addNewDebit} onPress={toNewDebits}>
        <Text style={styles.titleAddNew}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  listContainer: {
    maxHeight: '50%',
  },

  debits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#74EA8E',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  yourDebits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#EF624F',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  titleAmount: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
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
    borderRadius: 10,
    borderColor: '#23A7F1',
    marginTop: 20,
  },
});

export default Debits;
