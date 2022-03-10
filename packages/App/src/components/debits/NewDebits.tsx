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
import {addNewDebitRequest} from '../../store/actions/DebitsActions';
import {getAllItemWallet} from '../../store/actions/RalletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DebitNavigatorList} from '../../types/types';
import {DebitType} from '../../types/types';
import plusSource from '../../../pictures/debt/plus.png';
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
      let key = 0;
      let debitsArray;
      const person = value.name;
      const amount =
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
      const type = debitType;
      if (type === DebitType.toYou) {
        key =
          debitToYou.length === 0
            ? 1
            : debitToYou[debitToYou.length - 1].key + 1;
        debitsArray = debitToYou;
      }
      if (type === DebitType.yourDebit) {
        key =
          yourDebits.length === 0
            ? 1
            : yourDebits[yourDebits.length - 1].key + 1;
        debitsArray = yourDebits;
      }

      let wallet = cards.find(it => it.key === keyOfWallet);

      if (wallet) {
        if (type === DebitType.toYou) {
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount - amount,
          };
        }
        if (type === DebitType.yourDebit) {
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount + amount,
          };
        }
        if (wallet.walletAmount < 0) {
          Alert.alert('You can`t give debit, try another wallet');
        }
      }

      if (!wallet) {
        Alert.alert('Choose wallet');
      }

      if (wallet && key && debitsArray && wallet?.walletAmount > 0) {
        dispatch(
          addNewDebitRequest({
            wallet: wallet,
            debit: {key, person, amount, date, keyOfWallet, type},
            array: debitsArray,
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
          image={plusSource}
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
