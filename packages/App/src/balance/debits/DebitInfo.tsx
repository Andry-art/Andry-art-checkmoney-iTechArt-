import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
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
import {DebitNavigatorList, DebitType} from '../../types/types';
import minusSource from '../../../Pics/debt/minus.png';

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
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
        title="Going to be minus, delete?"
        isVisible={modalVisibleMinus}
        onPressDelete={deleteDebitMinus}
        onPressHide={hide}
      />
      <ScrollView style={styles.container}>
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
          <Image source={minusSource} style={styles.imgBtn} />
          <Text style={styles.textDelete}>DELETE DEBT</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
    marginHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#404CB2',
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
  textDelete: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
  },

  imgBtn: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
});

export default DebitInfo;
