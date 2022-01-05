import React, {FC, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
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

const colors = ['#8D45A7', '#DFE24A', '#56E24A', '#3FECEC', '#EA4953'];
const initialValues = {
  cardName: '',
  amount: '',
};

const newCardSchema = yup.object({
  cardName: yup.string().required().min(4),
  amount: yup.string().required(),
});

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList, 'BalanceMenu'>;
}

const NewCard: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const receivedWalletItems = useSelector(walletItems);
  const [cardColor, setCardColor] = useState<string>('#56E24A');

  const {handleChange, handleSubmit, values, isValid, dirty} = useFormik<{
    cardName: string;
    amount: string;
  }>({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: newCardSchema,
    onSubmit: values => {
      const cardName = values.cardName;
      const amount = values.amount;
      const color = cardColor;
      const key = receivedWalletItems[receivedWalletItems.length - 1].key + 1;

      dispatch(addNewCardRequest({cardName, amount, color, key}));
      navigation.goBack();
    },
  });

  const cardColorMemo = useMemo(
    () => [styles.card, {backgroundColor: cardColor}],
    [cardColor],
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Card</Text>
      </View>
      <View style={cardColorMemo}>
        <View style={styles.titleCard}>
          <Image source={walletIconSource} />
          <TextInput
            textContentType="name"
            style={styles.titleInput}
            onChangeText={handleChange('cardName')}
            value={values.cardName}
            placeholder="name of your wallet"
          />
        </View>
        <View style={styles.amountArea}>
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            onChangeText={handleChange('amount')}
            value={values.amount}
            placeholder="Amount of money"
          />
        </View>
      </View>
      <View style={styles.colorsArea}>
        {colors.map(it => (
          <ColorsNewCard key={it} color={it} onPress={setCardColor} />
        ))}
      </View>
      <TouchableOpacity
        disabled={!(isValid && dirty)}
        onPress={handleSubmit}
        style={!(isValid && dirty) ? styles.submitBtnDis : styles.submitBtn}>
        <Text style={styles.textBtn}>Add card</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#74EA8E',
    height: 200,
    borderRadius: 10,
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
    borderRadius: 10,
    height: 60,
    width: '100%',
    backgroundColor: '#5EE1FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtn: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },

  submitBtnDis: {
    marginTop: 40,
    borderRadius: 10,
    height: 60,
    width: '100%',
    backgroundColor: '#BEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
});

export default NewCard;
