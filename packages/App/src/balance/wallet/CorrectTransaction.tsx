import React, {FC, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {monetaryMove} from '../../store/selectors/walletItems';
import CategoriesInAddMoneyMove from './CategoriesInAddMoneyMove';
import {walletItems} from '../../store/selectors/walletItems';
import {addCorrectTransactionRequest} from '../../store/actions/walletActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  WalletNavigatorList,
  ChosenCategory,
  Income,
  Expenses,
} from '../../types/types';
import * as yup from 'yup';
import {useFormik} from 'formik';
import confirmSource from '../../../Pics/balance/basic-tick.png';
import {TransactionType} from '../../types/types';

const income: Income = ['iconUnknownSource', 'iconSalarySource'];
const expenses: Expenses = [
  'iconUnknownSource',
  'iconCarSource',
  'iconHealthSource',
  'iconGrocerySource',
  'iconShoppingSource',
  'iconRestaurantSource',
];

const transactionSchema = yup.object({
  amount: yup.string().required('Amount is required'),
});

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const CorrectTransaction: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const transaction = useSelector(monetaryMove);
  const receivedWalletItems = useSelector(walletItems);
  const [categoryInfo, setCategoryInfo] = useState<ChosenCategory>({
    icon: transaction.icon || '',
    category: transaction.category || '',
  });

  const oldAmount = useRef(transaction.amount);
  const oldIcon = useRef(transaction.icon);

  const {handleChange, handleSubmit, values} = useFormik<{
    amount: string;
  }>({
    initialValues: {amount: String(transaction.amount)},
    validationSchema: transactionSchema,
    onSubmit: values => {
      const keyTransaction = transaction.key;
      const amountTransaction =
        Math.round(
          Number(
            values.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
      const category = categoryInfo.category || '';
      const date = transaction.date || '';
      const type = transaction.type || '';
      const icon = categoryInfo.icon || '';
      let [item] = receivedWalletItems.filter(
        it => it.key === transaction.idCard,
      );
      let difference = Math.abs(amountTransaction - oldAmount.current);

      if (type === 'income' && oldAmount.current > amountTransaction) {
        item = {...item, walletAmount: item.walletAmount - difference};
      }
      if (type === 'income' && oldAmount.current < amountTransaction) {
        item = {...item, walletAmount: item.walletAmount + difference};
      }

      if (type === 'expenses' && oldAmount.current > amountTransaction) {
        item = {...item, walletAmount: item.walletAmount + difference};
      }
      if (type === 'expenses' && oldAmount.current < amountTransaction) {
        item = {...item, walletAmount: item.walletAmount - difference};
      }

      if (item.walletAmount < 0) {
        Alert.alert('Not enough money');
      }

      if (
        (oldAmount.current !== amountTransaction || oldIcon.current !== icon) &&
        (type === 'income' || item.walletAmount > 0)
      ) {
        dispatch(
          addCorrectTransactionRequest({
            item,
            correctedTransaction: {
              keyTransaction,
              amountTransaction,
              category,
              date,
              type,
              icon,
            },
            difference,
          }),
        );
        navigation.goBack();
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.BtnIncomeExpenses}>
        <Text style={styles.textIncomeExpenses}>
          {transaction.type?.toUpperCase()}
        </Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          value={values.amount}
          onChangeText={handleChange('amount')}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="0"
          contextMenuHidden={true}
        />
      </View>
      <View style={styles.categoriesList}>
        {transaction.type === TransactionType.income
          ? income.map(it => (
              <CategoriesInAddMoneyMove
                key={it}
                picture={it}
                onPress={setCategoryInfo}
                chosen={categoryInfo}
              />
            ))
          : expenses.map(it => (
              <CategoriesInAddMoneyMove
                key={it}
                picture={it}
                onPress={setCategoryInfo}
                chosen={categoryInfo}
              />
            ))}
      </View>
      <TouchableOpacity style={styles.confirm} onPress={handleSubmit}>
        <Image source={confirmSource} style={styles.img} />
        <Text style={styles.confirmText}>Correct {transaction.type}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },

  textTitle: {
    textAlign: 'center',
    padding: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  BtnIncomeExpenses: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textIncomeExpenses: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },

  inputArea: {
    height: 70,
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#404CB2',
    marginTop: 20,
    borderRadius: 10,
    textAlign: 'center',
  },

  confirm: {
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

  confirmText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  img: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },

  categoriesList: {
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
    borderRadius: 8,
  },
});

export default CorrectTransaction;
