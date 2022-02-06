import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {monetaryMove} from '../../store/selectors/walletItems';
import CategoriesInAddMoneyMove from './CategoriesInAddMoneyMove';
import {walletItems} from '../../store/selectors/walletItems';
import {addTransactionRequest} from '../../store/actions/walletActions';
import {
  WalletNavigatorList,
  ChosenCategory,
  Expenses,
  Income,
} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import imgArrowSource from '../../../Pics/double-arrow.png';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {TransactionType} from '../../types/types';
import addTransactionSource from '../../../Pics/balance/income.png';

const income: Income = ['iconUnknownSource', 'iconSalarySource'];
const expenses: Expenses = [
  'iconUnknownSource',
  'iconCarSource',
  'iconHealthSource',
  'iconGrocerySource',
  'iconShoppingSource',
  'iconRestaurantSource',
];

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const initialValues = {
  amount: '',
};

const transactionSchema = yup.object({
  amount: yup.string().required('Amount is required'),
});

const AddMonetaryMovements: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {key, amount, title} = useSelector(monetaryMove);
  const [isMoneyMove, setIsMoneyMove] = useState<string>(
    TransactionType.expenses,
  );
  const [categoryInfo, setCategoryInfo] = useState<ChosenCategory>({
    icon: 'iconUnknownSource',
    category: '',
  });

  const receivedWalletItems = useSelector(walletItems);

  const {handleChange, handleSubmit, values, errors} = useFormik<{
    amount: string;
  }>({
    initialValues: initialValues,
    validationSchema: transactionSchema,
    onSubmit: values => {
      const amountTransaction =
        Math.round(
          Number(
            values.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
      const type = isMoneyMove;
      const icon = categoryInfo.icon ? categoryInfo.icon : 'iconUnknownSource';
      const category = categoryInfo.category
        ? categoryInfo.category
        : 'Unknown';
      const chosenWallet = receivedWalletItems.find(it => it.key === key);
      if (chosenWallet !== undefined) {
        const keyTransaction =
          chosenWallet.transactions.length === 0
            ? 1
            : chosenWallet.transactions[0].keyTransaction + 1;

        const date = new Date(Date.now());

        if (
          type === 'expenses' &&
          chosenWallet.walletAmount - amountTransaction < 0
        ) {
          Alert.alert('Not enough money');
        }

        if (
          type === 'income' ||
          chosenWallet.walletAmount - amountTransaction >= 0
        ) {
          dispatch(
            addTransactionRequest({
              item: chosenWallet,
              transaction: {
                keyTransaction,
                type,
                amountTransaction,
                category,
                icon,
                date,
              },
            }),
          );
          navigation.goBack();
        }
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title?.toUpperCase()}</Text>
        <Text style={styles.textAmount}>{Math.round(amount * 100) / 100}$</Text>
      </View>

      <View style={styles.moneyMoves}>
        <TouchableOpacity
          style={
            isMoneyMove === TransactionType.expenses
              ? styles.BtnIncomeExpensesFocus
              : styles.BtnIncomeExpenses
          }
          onPress={() => setIsMoneyMove(TransactionType.expenses)}>
          <Text style={styles.textIncomeExpenses}>Expenses</Text>
        </TouchableOpacity>
        <Image source={imgArrowSource} />
        <TouchableOpacity
          style={
            isMoneyMove === TransactionType.income
              ? styles.BtnIncomeExpensesFocus
              : styles.BtnIncomeExpenses
          }
          onPress={() => setIsMoneyMove(TransactionType.income)}>
          <Text style={styles.textIncomeExpenses}>Income</Text>
        </TouchableOpacity>
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
        <Text style={styles.validation}>{errors.amount}</Text>
      </View>
      <View style={styles.categoriesList}>
        {isMoneyMove === TransactionType.income
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
        <Image source={addTransactionSource} style={styles.img} />
        <Text style={styles.confirmText}>Add {isMoneyMove}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },

  title: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  textTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#A8ADDD',
    fontSize: 14,
  },

  textAmount: {
    fontWeight: '600',
    fontSize: 32,
    color: 'black',
  },

  BtnIncomeExpenses: {
    height: 40,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },

  textIncomeExpenses: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },

  BtnIncomeExpensesFocus: {
    height: 40,
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
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

  moneyMoves: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  validation: {
    marginLeft: 30,
    color: 'red',
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

  img: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
});

export default AddMonetaryMovements;
