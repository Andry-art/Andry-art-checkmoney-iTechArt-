import React, {FC, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import walletIconSource from '../../../Pics/balance/wallet.png';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addNewCardRequest} from '../../store/actions/walletActions';
import {walletItems} from '../../store/selectors/walletItems';
import * as yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletNavigatorList} from '../../types/types';
import ColorsNewCard from './ColorsNewCard';
import EncryptedStorage from 'react-native-encrypted-storage';

const colors = ['#8D45A7', '#DFE24A', '#56E24A', '#3FECEC', '#EA4953'];
const initialValues = {
  cardName: '',
  amount: '',
};

const newCardSchema = yup.object({
  cardName: yup.string().required('Title is required').min(4),
  amount: yup.string().required('Amount is required'),
});

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const NewCard: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const receivedWalletItems = useSelector(walletItems);
  const [cardColor, setCardColor] = useState<string>('#56E24A');
  const [placeholderTitle, setPlaceholderTitle] = useState<string>('Title');
  const [placeholderAmount, setPlaceholderAmount] = useState<string>('Amount');

  const {handleChange, handleSubmit, values, errors} = useFormik<{
    cardName: string;
    amount: string;
  }>({
    initialValues: initialValues,
    validationSchema: newCardSchema,
    onSubmit: values => {
      const cardName = values.cardName;
      const amount =
        Math.round(
          Number(
            values.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
      const color = cardColor;
      const key = receivedWalletItems[receivedWalletItems.length - 1].key + 1;
      console.log(amount);
      dispatch(addNewCardRequest({cardName, amount, color, key}));

      navigation.goBack();
    },
  });

  const cardColorMemo = useMemo(
    () => [styles.card, {backgroundColor: cardColor}],
    [cardColor],
  );

  const cleanee = async () => {
    await EncryptedStorage.removeItem('user_session');
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="ddddd" onPress={cleanee} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Card</Text>
      </View>
      <View style={cardColorMemo}>
        <View style={styles.titleCard}>
          <Image source={walletIconSource} />
          <View style={styles.titleArea}>
            <TextInput
              textContentType="name"
              style={styles.titleInput}
              onChangeText={handleChange('cardName')}
              value={values.cardName}
              placeholder={placeholderTitle}
              onFocus={() => setPlaceholderTitle('')}
              onEndEditing={() => setPlaceholderTitle('Title')}
            />
            <Text style={styles.error}>{errors.cardName}</Text>
          </View>
        </View>
        <View style={styles.amountArea}>
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            onChangeText={handleChange('amount')}
            value={values.amount}
            placeholder={placeholderAmount}
            onFocus={() => setPlaceholderAmount('')}
            onEndEditing={() => setPlaceholderAmount('Amount')}
            contextMenuHidden={true}
          />
          <Text style={styles.error}>{errors.amount}</Text>
        </View>
      </View>
      <View style={styles.colorsArea}>
        {colors.map(it => (
          <ColorsNewCard key={it} color={it} onPress={setCardColor} />
        ))}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.textBtn}>Add card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: 'black',
  },

  card: {
    justifyContent: 'flex-start',
    height: 200,
    borderRadius: 30,
    padding: 20,
  },

  titleContainer: {
    alignItems: 'center',
    padding: 30,
  },

  titleCard: {
    flexDirection: 'row',
  },

  titleInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '40%',
    padding: 0,
    marginHorizontal: 20,
  },

  amountArea: {
    alignItems: 'center',
    padding: 40,
  },

  amountInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '50%',
    padding: 0,
    marginHorizontal: 20,
    textAlign: 'center',
  },

  colorsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },

  submitBtn: {
    marginTop: 40,
    borderRadius: 30,
    height: 60,
    width: '100%',
    backgroundColor: '#7CD0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },

  textBtn: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  error: {
    marginHorizontal: 20,
    color: 'black',
  },

  titleArea: {
    width: '100%',
  },
});

export default NewCard;
