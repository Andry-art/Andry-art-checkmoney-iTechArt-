import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListOFCards from './ListOFCards';
import {walletItems} from '../../store/selectors/walletItems';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {getDebitsToYou, getYourDebits} from '../../store/selectors/debits';
import {addNewDebitRequest} from '../../store/actions/debitsActions';
import {getAllItemWallet} from '../../store/actions/walletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DebitNavigatorList} from '../../types/types';

const newDebitSchema = yup.object({
  name: yup.string().required(),
  amount: yup.string().required(),
});

const initialValues = {
  name: '',
  amount: '',
};

interface Props {
  navigation: NativeStackNavigationProp<DebitNavigatorList>;
}

enum DebitType {
  toYou = 'debit to you',
  yourDebit = 'your debit',
}

const NewDebits: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const cards = useSelector(walletItems);
  const toYou = useSelector(getDebitsToYou);
  const yourDebits = useSelector(getYourDebits);
  const [debitType, setDebitType] = useState<string>(DebitType.toYou);
  const [keyCard, setKeyCard] = useState<number>(0);

  const setDebitToYou = () => {
    setDebitType(DebitType.toYou);
  };

  const setYourDebit = () => {
    setDebitType(DebitType.yourDebit);
  };

  const formik = useFormik<{name: string; amount: string}>({
    initialValues: initialValues,
    validationSchema: newDebitSchema,
    onSubmit: value => {
      let key = 0;
      let debitsArray;
      const person = value.name;
      const amount = Number(value.amount);
      const date = new Date().toLocaleDateString();
      const keyOfWallet = keyCard;
      const type = debitType;
      if (type === DebitType.toYou) {
        key = toYou[toYou.length - 1].key + 1;
        debitsArray = toYou;
      }
      if (type === DebitType.yourDebit) {
        key = yourDebits[yourDebits.length - 1].key + 1;
        debitsArray = yourDebits;
      }

      const wallet = cards.find(it => it.key === keyOfWallet);

      if (wallet && key && debitsArray) {
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
    <>
      <View>
        <View style={styles.debtBTN}>
          <TouchableOpacity
            style={
              debitType === DebitType.toYou
                ? styles.activeBTNtoYou
                : styles.inactiveBTNtoYou
            }
            onPress={setDebitToYou}>
            <Text style={styles.btnText}>To you</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              debitType === DebitType.yourDebit
                ? styles.activeBTNYour
                : styles.inactiveBTNYour
            }
            onPress={setYourDebit}>
            <Text style={styles.btnText}>Your debt</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('name')}
            value={formik.values.name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('amount')}
            value={formik.values.amount}
            placeholder="Amount"
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
              color={item.color}
              cardKey={item.key}
              onPress={setKeyCard}
              chosenCard={keyCard}
            />
          )}
          horizontal
        />
        <TouchableOpacity
          style={styles.btnConfirm}
          onPress={formik.handleSubmit}>
          <Text style={styles.textConfirm}>Add new debit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  debtBTN: {
    padding: 20,
    flexDirection: 'row',
  },
  activeBTNtoYou: {
    width: '50%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#0C547C',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveBTNtoYou: {
    width: '50%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#D1EDFC',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeBTNYour: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '50%',
    backgroundColor: '#0C547C',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveBTNYour: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '50%',
    backgroundColor: '#D1EDFC',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputArea: {
    paddingHorizontal: 20,
  },

  input: {
    backgroundColor: 'white',
    height: 40,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  listOfCards: {
    padding: 20,
  },

  btnText: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },

  btnConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
    height: 55,
    backgroundColor: '#7CD0FF',
  },

  textConfirm: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },
});

export default NewDebits;
