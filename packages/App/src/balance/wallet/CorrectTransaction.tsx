import React, {FC, useRef, useState} from 'react';
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
import {WalletItems} from '../../store/selectors/walletItems';
import {getCorrectTransaction} from '../../store/actions/walletActions';

const income = ['iconUnknownSource', 'iconSalarySource'];
const expenses = [
  'iconUnknownSource',
  'iconCarSource',
  'iconHealthSource',
  'iconGrocerySource',
  'iconShoppingSource',
  'iconRestaurantSource',
];

const CorrectTransaction: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const transaction = useSelector(monetaryMove);

  const receivedWalletItems = useSelector(WalletItems);
  const [categoryInfo, setCategoryInfo] = useState<{
    icon: string;
    category: string;
  }>({
    icon: transaction.icon || '',
    category: transaction.category || '',
  });
  const [inputValue, setInputValue] = useState<string>(
    String(transaction.amount),
  );

  const [modal, setModal] = useState<boolean>(false);

  const oldAmount = useRef(transaction.amount);
  const oldIcon = useRef(transaction.icon);

  const changeTransaction = () => {
    const keyTransaction = transaction.key;
    const amountTransaction = Number(inputValue);
    const category = transaction.category || '';
    const date = transaction.date || '';
    const type = transaction.type || '';
    const icon = categoryInfo.icon || '';
    let [item] = receivedWalletItems.filter(
      it => it.key === transaction.idCard,
    );
    let difference = amountTransaction - oldAmount.current;
    if (difference < 0) {
      difference = difference * -1;
    }

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
      setModal(true);
    }

    if (
      (oldAmount.current !== amountTransaction || oldIcon.current !== icon) &&
      (type === 'income' || item.walletAmount > 0)
    ) {
      dispatch(
        getCorrectTransaction({
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
    }
    navigation.goBack();
  };

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
      <Text style={styles.textTitle}>Correct transaction</Text>
      <View style={styles.BtnIncomeExpenses}>
        <Text style={styles.textIncomeExpenses}>{transaction.type}</Text>
      </View>
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
          data={transaction.type === 'income' ? income : expenses}
          keyExtractor={it => it}
          renderItem={it => (
            <CategoriesInAddMoneyMove
              pic={it.item}
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
        onPress={changeTransaction}>
        <Text style={styles.confirmText}>Correct {transaction.type}</Text>
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

export default CorrectTransaction;
