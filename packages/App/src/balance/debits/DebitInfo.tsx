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

const DebitInfo: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const info = useSelector(debitInfo);
  const wallet = useSelector(walletName);
  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hide = useCallback(() => {
    setModalVisible(false);
  }, []);

  const deleteCard = useCallback(() => {
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
  }, [dispatch, info, navigation, toYou, wallet, yourDebits]);

  return (
    <>
      <CardModal
        title=" Would you like to delete debit?"
        isVisible={modalVisible}
        onPressDelete={deleteCard}
        onPressHide={hide}
      />
      <View>
        <Text style={styles.title}>Debit info</Text>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>
            {info.type === 'debit to you' ? 'Debit to you from' : 'You own to'}
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
    borderRadius: 10,
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
