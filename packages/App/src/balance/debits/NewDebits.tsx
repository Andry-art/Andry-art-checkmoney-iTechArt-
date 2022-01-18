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
import {DebitType} from '../../types/types';
import plusSource from '../../../Pics/debt/plus.png';

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
          title="You can`t give debit, try another wallet"
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
              cardKey={item.key}
              onPress={setKeyCard}
              chosenCard={keyCard}
            />
          )}
          horizontal
        />
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={formik.handleSubmit}>
            <Image source={plusSource} style={styles.imgBtn} />
            <Text style={styles.textConfirm}>ADD NEW DEBT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },

  debtBTN: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  activeBTNtoYou: {
    height: 40,
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },
  inactiveBTNtoYou: {
    height: 40,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },

  activeBTNYour: {
    height: 40,
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },

  inactiveBTNYour: {
    height: 40,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },

  inputArea: {
    paddingHorizontal: 20,
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
  },

  btnText: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
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
});

export default NewDebits;
