import React, {FC, useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
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

const keyExtractor = (it: string) => it;

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

  const [isModal, setIsModal] = useState<boolean>(false);

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
      const category = transaction.category || '';
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
        setIsModal(true);
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

  const setModal = useCallback(() => {
    setIsModal(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isModal}>
        <View style={styles.modal}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTextTitle}>Not enough money</Text>
          </View>
          <View style={styles.modalBtnArea}>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={setModal}>
              <Text style={styles.modalBtnText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.textTitle}>Correct transaction</Text>
      <View style={styles.BtnIncomeExpenses}>
        <Text style={styles.textIncomeExpenses}>{transaction.type}</Text>
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
      <View>
        <FlatList
          data={transaction.type === 'income' ? income : expenses}
          keyExtractor={keyExtractor}
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
        <Text style={styles.confirmText}>Correct {transaction.type}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
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
    borderRadius: 10,
  },

  modalBtnCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '40%',
    backgroundColor: '#74EA8E',
    borderRadius: 10,
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

  textTitle: {
    textAlign: 'center',
    padding: 10,
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
  },

  textIncomeExpenses: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
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
});

export default CorrectTransaction;
