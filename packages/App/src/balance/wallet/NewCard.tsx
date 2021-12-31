import React, {FC, useState} from 'react';
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
import {addNewCard} from '../../store/actions/walletActions';
import {WalletItems} from '../../store/selectors/walletItems';
import * as yup from 'yup';

const colors = ['#8D45A7', '#DFE24A', '#56E24A', '#3FECEC', '#EA4953'];
const initialValues = {
  cardName: '',
  amount: '',
};

const newCardSchema = yup.object({
  cardName: yup.string().required().min(4),
  amount: yup.string().required(),
});

const NewCard: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const receivedWalletItems = useSelector(WalletItems);
  const [cardColor, setCardColor] = useState('#56E24A');

  const {handleChange, handleSubmit, values, isValid, dirty} = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: newCardSchema,
    onSubmit: (values: {cardName: string; amount: string}) => {
      const cardName = values.cardName;
      const amount = values.amount;
      const color = cardColor;
      const key = receivedWalletItems[receivedWalletItems.length - 1].key + 1;

      dispatch(addNewCard({cardName, amount, color, key}));
      navigation.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Card</Text>
      </View>
      <View style={[styles.card, {backgroundColor: cardColor}]}>
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
          <TouchableOpacity
            key={it}
            style={[styles.colorsItems, {backgroundColor: it}]}
            onPress={() => setCardColor(it)}
          />
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
  colorsItems: {
    width: 60,
    height: 60,
    borderRadius: 100,
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
