import React, {FC, useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  debitInfo,
  walletName,
  getDebitsToYou,
  getYourDebits,
} from '../../store/selectors/debits';
import CardModal from '../../components/CardModal';
import {deleteDebitRequest} from '../../store/actions/debitsActions';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DebitNavigatorList} from '../../types/types';

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

enum DebitType {
  toYou = 'debit to you',
  yourDebit = 'your debit',
}

const DebitInfo: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const info = useSelector(debitInfo);
  let wallet = useSelector(walletName);
  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleMinus, setModalVisibleMinus] = useState<boolean>(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hide = useCallback(() => {
    setModalVisible(false);
    setModalVisibleMinus(false);
  }, []);

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
      navigation.goBack();
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
        setModalVisibleMinus(true);
      }
    }

    if (wallet && debitsArray && wallet?.walletAmount > 0) {
      dispatch(
        deleteDebitRequest({wallet: wallet, debit: info, array: debitsArray}),
      );
      navigation.goBack();
      dispatch(getAllItemWallet());
    }
  };

  return (
    <>
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
      <View style={styles.container}>
        <Text style={styles.title}>Debit info</Text>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>
            {info.type === DebitType.toYou ? 'Debit to you from' : 'You own to'}
          </Text>
          <Text style={styles.textAmount}>{info.person}</Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Date</Text>
          <Text style={styles.textAmount}>{info.date}</Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Amount</Text>
          <Text style={styles.textAmount}>{info.amount}$</Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Wallet</Text>
          <Text style={styles.textAmount}>{wallet?.walletTitle}</Text>
        </View>
        <TouchableOpacity style={styles.btnDelete} onPress={showModal}>
          <Text style={styles.textDelete}>Delete debit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
  },
  debitInfo: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#C7EBFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E6F6FF',
  },
  textName: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  textAmount: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
  },
  btnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
    height: 55,
    backgroundColor: '#F64242',
  },
  textDelete: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },
});

export default DebitInfo;
