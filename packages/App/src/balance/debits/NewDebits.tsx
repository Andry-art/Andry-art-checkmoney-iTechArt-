import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ScrollView,
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
import imgArrowSource from '../../../Pics/double-arrow.png';
import ModalNewDebit from '../../components/ModalNewDebit';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const hide = () => {
    setModalVisible(false);
  };

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
      const amount =
        Math.round(
          Number(
            value.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
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

      let wallet = cards.find(it => it.key === keyOfWallet);

      if (wallet) {
        if (type === 'debit to you') {
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount - amount,
          };
        }
        if (type === 'your debit') {
          wallet = {
            ...wallet,
            walletAmount: wallet.walletAmount + amount,
          };
        }
        if (wallet.walletAmount < 0) {
          setModalVisible(true);
        }
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
    <>
      <ScrollView style={styles.container}>
        <ModalNewDebit
          title="You cant give debit, try another wallet"
          isVisible={modalVisible}
          onPressHide={hide}
        />

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
          <Image source={imgArrowSource} />
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
          <Text style={styles.error}>{formik.errors.name}</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={formik.handleChange('amount')}
            value={formik.values.amount}
            placeholder="Amount"
            contextMenuHidden={true}
          />
          <Text style={styles.error}>{formik.errors.amount}</Text>
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  debtBTN: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  activeBTNtoYou: {
    width: '40%',
    borderRadius: 30,
    backgroundColor: '#0C547C',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveBTNtoYou: {
    width: '40%',
    borderRadius: 30,
    backgroundColor: '#D1EDFC',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeBTNYour: {
    borderRadius: 30,
    width: '40%',
    backgroundColor: '#0C547C',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveBTNYour: {
    borderRadius: 30,
    width: '40%',
    backgroundColor: '#D1EDFC',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputArea: {
    paddingHorizontal: 20,
  },

  input: {
    borderColor: '#32A7E9',
    borderWidth: 1,
    minHeight: 50,
    backgroundColor: 'white',
    height: 40,
    marginTop: 10,
    borderRadius: 30,
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
    borderRadius: 30,
    margin: 20,
    height: 55,
    backgroundColor: '#7CD0FF',
    marginBottom: 90,
  },

  textConfirm: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  error: {
    marginLeft: 10,
    color: 'red',
  },
});

export default NewDebits;
