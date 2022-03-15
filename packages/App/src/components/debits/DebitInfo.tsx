import React, {FC} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {debitInfo, walletName} from '../../store/selectors/DebitSelectors';
import {
  deleteTransactionRequest,
  getAllItemWallet,
} from '../../store/actions/WalletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DebitNavigatorList, DebitType} from '../../types/types';
import dayjs from 'dayjs';
import ButtonApp from '../ButtonApp';
import minusSource from '../../../pictures/debt/minus.png';

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

const DebitInfoComponent: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const info = useSelector(debitInfo);
  let wallet = useSelector(walletName);
  const transactionKey = {
    keyTransaction: info.keyTransaction,
    amountTransaction: info.amountTransaction,
    type: info.type,
  };

  const showModal = () => {
    Alert.alert(' Would you like to delete card?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          if (wallet) {
            if (info.type === DebitType.toYou) {
              wallet = {
                ...wallet,
                walletAmount: wallet.walletAmount + info.amountTransaction,
              };
            }
            if (info.type === DebitType.yourDebit) {
              wallet = {
                ...wallet,
                walletAmount: wallet.walletAmount - info.amountTransaction,
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

          if (wallet && wallet?.walletAmount > 0) {
            dispatch(deleteTransactionRequest({item: wallet, transactionKey}));
            navigation.goBack();
            dispatch(getAllItemWallet());
          }
        },
      },
    ]);
  };

  const deleteDebitMinus = () => {
    if (wallet) {
      dispatch(deleteTransactionRequest({item: wallet, transactionKey}));
      navigation.goBack();
      dispatch(getAllItemWallet());
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>
            {info.type === DebitType.toYou ? 'Debit to you from' : 'You own to'}
          </Text>
          <Text style={styles.textAmount}>{info.person}</Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Date</Text>
          <Text style={styles.textAmount}>
            {dayjs(info.date).format('DD/MM/YY')}
          </Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Amount</Text>
          <Text style={styles.textAmount}>{info.amountTransaction}$</Text>
        </View>
        <View style={styles.debitInfo}>
          <Text style={styles.textName}>Wallet</Text>
          <Text style={styles.textAmount}>{wallet?.walletTitle}</Text>
        </View>
        <View style={styles.btnDelete}>
          <ButtonApp
            label="DELETE DEBT"
            onPress={showModal}
            image={minusSource}
          />
        </View>
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
    marginTop: 40,
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

export default DebitInfoComponent;
