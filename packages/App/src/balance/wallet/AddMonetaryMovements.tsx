import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Image,
  ScrollView,
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

enum TransactionType {
  income = 'income',
  expenses = 'expenses',
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
  const [modal, setModal] = useState<boolean>(false);

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
          setModal(true);
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
      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={styles.modal}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTextTitle}>Not enough money</Text>
          </View>
          <View style={styles.modalBtnArea}>
            <TouchableOpacity
              style={styles.modalBtnCancel}
              onPress={() => setModal(false)}>
              <Text style={styles.modalBtnText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.title}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textAmount}>{amount}$</Text>
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
      <View>
        <FlatList
          data={isMoneyMove === TransactionType.income ? income : expenses}
          keyExtractor={it => it}
          renderItem={it => (
            <CategoriesInAddMoneyMove
              picture={it.item}
              onPress={setCategoryInfo}
              chosen={categoryInfo}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.confirm} onPress={handleSubmit}>
        <Text style={styles.confirmText}>Add {isMoneyMove}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderRadius: 30,
    justifyContent: 'center',
    height: '25%',
    backgroundColor: '#23A7F1',
    padding: 20,
    marginHorizontal: 40,
    marginVertical: 200,
  },

  modalTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBtnArea: {
    marginVertical: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },

  modalBtnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '40%',
    backgroundColor: 'red',
    borderRadius: 30,
  },

  modalBtnCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '40%',
    backgroundColor: '#74EA8E',
    borderRadius: 30,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  modalTextTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  textTitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  textAmount: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  BtnIncomeExpenses: {
    height: 50,
    backgroundColor: '#D0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 30,
  },

  textIncomeExpenses: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  BtnIncomeExpensesFocus: {
    height: 50,
    backgroundColor: '#32A7E9',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 30,
  },

  inputArea: {
    height: 70,
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#32A7E9',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
  },

  confirm: {
    alignItems: 'center',
    margin: 20,
    paddingVertical: 20,
    backgroundColor: '#7CD0FF',
    borderRadius: 30,
    marginBottom: 80,
  },

  confirmText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  moneyMoves: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  validation: {
    marginLeft: 30,
    color: 'red',
  },
});

export default AddMonetaryMovements;
