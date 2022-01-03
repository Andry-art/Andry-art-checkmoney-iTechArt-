import React, {FC, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {monetaryMove} from '../../store/selectors/walletItems';
import CategoriesInAddMoneyMove from './CategoriesInAddMoneyMove';
import {walletItems} from '../../store/selectors/walletItems';
import {addTransactionRequest} from '../../store/actions/walletActions';
import {
  BalanceNavigatorList,
  ChosenCategory,
  Expenses,
  Income,
} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  navigation: NativeStackNavigationProp<BalanceNavigatorList, 'BalanceMenu'>;
}

const AddMonetaryMovements: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {key, amount, title} = useSelector(monetaryMove);
  const [isMoneyMove, setIsMoneyMove] = useState<boolean>(false);
  const [categoryInfo, setCategoryInfo] = useState<ChosenCategory>({
    icon: '',
    category: '',
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  const receivedWalletItems = useSelector(walletItems);

  const addCategory = () => {
    const amountTransaction = Number(inputValue);
    const type = isMoneyMove ? 'income' : 'expenses';
    const icon = categoryInfo.icon ? categoryInfo.icon : 'iconUnknownSource';
    const category = categoryInfo.category ? categoryInfo.category : 'Unknown';
    const chosenWallet = receivedWalletItems.find(it => it.key === key);
    if (chosenWallet !== undefined) {
      const keyTransaction =
        chosenWallet.transactions.length === 0
          ? 1
          : chosenWallet.transactions[0].keyTransaction + 1;

      const date = new Date().toLocaleDateString();

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
  };

  const changeMovements = useCallback(() => {
    setIsMoneyMove(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.BtnIncomeExpenses}
        onPress={changeMovements}>
        <Text style={styles.textIncomeExpenses}>
          {isMoneyMove ? 'Income' : 'Expenses'}
        </Text>
      </TouchableOpacity>
      <View style={styles.inputArea}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="0"
        />
      </View>
      <View>
        <FlatList
          data={isMoneyMove ? income : expenses}
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
      <TouchableOpacity
        disabled={inputValue ? false : true}
        style={inputValue ? styles.confirm : styles.confirmDis}
        onPress={addCategory}>
        <Text style={styles.confirmText}>
          {isMoneyMove ? 'Add income' : 'Add expenses'}
        </Text>
      </TouchableOpacity>
    </View>
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
  },

  textIncomeExpenses: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  inputArea: {
    height: 50,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 20,
  },

  confirm: {
    alignItems: 'center',
    margin: 20,
    paddingVertical: 20,
    backgroundColor: '#7CD0FF',
    borderRadius: 10,
  },

  confirmText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  confirmDis: {
    alignItems: 'center',
    margin: 20,
    paddingVertical: 20,
    backgroundColor: '#BEF3FF',
    borderRadius: 10,
  },
});

export default AddMonetaryMovements;
