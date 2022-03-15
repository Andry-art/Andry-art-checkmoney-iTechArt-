import React, {FC, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListOFCards from './ListOFCards';
import {walletItems} from '../../store/selectors/WalletSelectors';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
  getDebitsToYou,
  getYourDebits,
} from '../../store/selectors/DebitSelectors';
import {
  addTransactionRequest,
  getAllItemWallet,
} from '../../store/actions/WalletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DebitNavigatorList} from '../../types/types';
import {DebitType} from '../../types/types';
import Input from '../Input';
import ButtonApp from '../ButtonApp';
import Switcher from '../Switcher';

const newDebitSchema = yup.object({
  name: yup.string().required('Name is required'),
  amount: yup.string().required('Amount is required'),
});

const initialValues = {
  name: '',
  amount: '',
};

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

const NewDebits: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const cards = useSelector(walletItems);
  const debitToYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const [debitType, setDebitType] = useState<string>(DebitType.toYou);
  const [keyCard, setKeyCard] = useState<number>(0);

  const setDebitToYou = () => {
    setDebitType(DebitType.toYou);
  };

  const setYourDebit = () => {
    setDebitType(DebitType.yourDebit);
  };

  const {handleChange, handleSubmit, values, errors} = useFormik<{
    name: string;
    amount: string;
  }>({
    initialValues: initialValues,
    validationSchema: newDebitSchema,
    onSubmit: value => {
      let keyTransaction = 0;
      let debitsArray;
      const person = value.name;
      const icon = DebitType.icon;
      let category;
      const amountTransaction =
        Math.round(
          Number(
            value.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
      const date = String(new Date(Date.now()));
      const keyOfWallet = keyCard;
      let wallet = cards.find(it => it.key === keyOfWallet);
      const type = debitType;
      if (type === DebitType.toYou && wallet) {
        keyTransaction =
          wallet.transactions.length === 0
            ? 1
            : wallet.transactions[0].keyTransaction + 1;
        debitsArray = debitToYou;
      }
      if (type === DebitType.yourDebit && wallet) {
        keyTransaction =
          wallet.transactions.length === 0
            ? 1
            : wallet.transactions[0].keyTransaction + 1;
        debitsArray = yourDebits;
      }

      if (wallet) {
        if (type === DebitType.toYou) {
          category = DebitType.toYou;
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount - amountTransaction,
          };
        }
        if (type === DebitType.yourDebit) {
          category = DebitType.yourDebit;
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount + amountTransaction,
          };
        }
        if (wallet.walletAmount < 0) {
          Alert.alert('You can`t give debit, try another wallet');
        }
      }

      if (!wallet) {
        Alert.alert('Choose wallet');
      }

      if (wallet && keyTransaction && debitsArray && wallet?.walletAmount > 0) {
        dispatch(
          addTransactionRequest({
            item: wallet,
            transaction: {
              keyTransaction,
              person,
              amountTransaction,
              date,
              keyOfWallet,
              type,
              icon,
              category,
            },
          }),
        );
        navigation.goBack();
        dispatch(getAllItemWallet());
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.switcher}>
        <Switcher
          choosenBtn={debitType}
          onPressFirst={setDebitToYou}
          onPressSecond={setYourDebit}
          titleFirst={DebitType.toYou}
          titleSecond={DebitType.yourDebit}
        />
      </View>
      <View style={styles.inputArea}>
        <Input
          onChangeText={handleChange('name')}
          value={values.name}
          errors={errors.name}
          placeholder="Name"
          isPassword={false}
        />
        <Input
          onChangeText={handleChange('amount')}
          value={values.amount}
          keyboardType="number-pad"
          errors={errors.amount}
          placeholder="Amount"
          isPassword={false}
        />
      </View>
      <FlatList
        style={styles.listOfCards}
        data={cards}
        keyExtractor={it => String(it.key)}
        renderItem={({item}) => (
          <ListOFCards
            amount={item.walletAmount}
            title={item.walletTitle}
            cardKey={item.key}
            onPress={setKeyCard}
            chosenCard={keyCard}
          />
        )}
        horizontal
      />
      <View style={styles.btnArea}>
        <ButtonApp
          label="ADD NEW DEBT"
          onPress={handleSubmit}
          // image="addDebit"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },

  inputArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  input: {
    fontSize: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#404CB2',
    marginTop: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  listOfCards: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  btnConfirm: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 100,
    width: '100%',
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    marginTop: 30,
    marginBottom: 80,
  },

  textConfirm: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },

  error: {
    marginLeft: 10,
    color: 'red',
  },

  btnArea: {
    paddingHorizontal: 20,
  },

  imgBtn: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
  switcher: {
    paddingHorizontal: 20,
  },
});

export default NewDebits;
