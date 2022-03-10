import React, {FC, useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addNewCardRequest} from '../../store/actions/RalletActions';
import {walletItems} from '../../store/selectors/WalletSelectors';
import * as yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletNavigatorList} from '../../types/types';
import ColorsNewCard from './ColorsNewCard';
import LinearGradient from 'react-native-linear-gradient';
import ButtonApp from '../ButtonApp';

const colors = [
  ['#F39034', '#FF2727'],
  ['#003AD2', '#0097EC'],
  ['#00A843', '#1FD071'],
  ['#5900C9', '#9852F0'],
  ['#01DCBA', '#7F30CB'],
];
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
  const [cardColor, setCardColor] = useState<Array<string>>([
    '#F39034',
    '#FF2727',
  ]);
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
      dispatch(addNewCardRequest({cardName, amount, color, key}));

      navigation.goBack();
    },
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={cardColor}
        style={styles.card}>
        <View style={styles.titleCard}>
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
        <View>
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
      </LinearGradient>
      <View style={styles.colorsArea}>
        {colors.map((it, i) => (
          <ColorsNewCard key={i} color={it} onPress={setCardColor} />
        ))}
      </View>
      <ButtonApp label="ADD NEW CARD" onPress={handleSubmit} image="addCard" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },

  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    borderRadius: 40,
    elevation: 3,
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: 'black',
  },

  card: {
    justifyContent: 'flex-start',
    height: 180,
    borderRadius: 30,
    padding: 24,
    marginHorizontal: 30,
  },

  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },

  titleCard: {
    flexDirection: 'row',
  },

  titleInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '40%',
    padding: 0,
  },

  amountInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '50%',
    padding: 0,
  },

  colorsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 10,
  },

  submitBtn: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 10,
    height: 100,
    width: '100%',
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 7,
  },

  textBtn: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  error: {
    color: 'black',
  },

  titleArea: {
    width: '100%',
  },

  img: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
});

export default NewCard;
