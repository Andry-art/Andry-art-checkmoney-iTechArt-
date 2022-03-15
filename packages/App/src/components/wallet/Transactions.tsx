import React, {FC, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import iconCarSource from '../../../pictures/categories/car.png';
import iconHealthSource from '../../../pictures/categories/heart-beat.png';
import iconGrocerySource from '../../../pictures/categories/food.png';
import iconUnknownSource from '../../../pictures/categories/question.png';
import iconShoppingSource from '../../../pictures/categories/shop-bag.png';
import iconRestaurantSource from '../../../pictures/categories/restaurant.png';
import iconSalarySource from '../../../pictures/categories/money.png';
import iconDebit from '../../../pictures/debt/loan.png';
import {AmountInCents, DebitType} from '../../types/types';
import {TransactionType} from '../../types/types';
import dayjs from 'dayjs';
import {addDebitInfo} from '../../store/actions/DebitsActions';
import {useDispatch} from 'react-redux';

interface Props {
  keyTransaction: number;
  category: string;
  amount: AmountInCents;
  date: string;
  type: string;
  icon: string;
  keyOfWallet: number;
  person: string;
  onLongPress: (keyTransaction: number, amount: number, type: string) => void;
  onPress: (
    keyTransaction: number,
    category: string,
    date: string,
    amount: number,
    type: string,
    icon: string,
    keyOfWallet?: number,
    person?: string,
  ) => void;
}

const Transactions: FC<Props> = ({
  keyTransaction,
  category,
  amount,
  date,
  type,
  icon,
  keyOfWallet,
  person,
  onLongPress,
  onPress,
}) => {
  const dispatch = useDispatch();
  const imgSource: Record<string, ImageSourcePropType> = {
    iconCarSource: iconCarSource,
    iconHealthSource: iconHealthSource,
    iconUnknownSource: iconUnknownSource,
    iconGrocerySource: iconGrocerySource,
    iconShoppingSource: iconShoppingSource,
    iconRestaurantSource: iconRestaurantSource,
    iconSalarySource: iconSalarySource,
    iconDebit: iconDebit,
  };

  const img = imgSource[icon];

  const onLongPressCallBack = useCallback(() => {
    dispatch(
      addDebitInfo({
        type,
        keyOfWallet,
        keyTransaction,
        date,
        person,
        amountTransaction: amount,
      }),
    );
    onLongPress(keyTransaction, amount, type);
  }, [
    amount,
    date,
    dispatch,
    keyOfWallet,
    keyTransaction,
    onLongPress,
    person,
    type,
  ]);

  const onPressCallBack = useCallback(() => {
    onPress(
      keyTransaction,
      category,
      date,
      amount,
      type,
      icon,
      keyOfWallet,
      person,
    );
  }, [
    amount,
    category,
    date,
    icon,
    keyOfWallet,
    keyTransaction,
    onPress,
    person,
    type,
  ]);

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={onLongPressCallBack}
      onPress={onPressCallBack}>
      <View style={styles.iconsInfo}>
        <View
          style={
            type === TransactionType.income || type === DebitType.yourDebit
              ? styles.iconBGIncome
              : styles.iconBGExpens
          }>
          <Image
            source={img}
            style={
              type === TransactionType.income || type === DebitType.yourDebit
                ? styles.imgIncome
                : styles.imgExpenses
            }
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.date}>{dayjs(date).format('DD/MM/YY')}</Text>
        </View>
      </View>
      {type === TransactionType.income || type === DebitType.yourDebit ? (
        <Text style={styles.sumPlus}>+{amount}$</Text>
      ) : (
        <Text style={styles.sumMinus}>-{amount}$</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 100,
    width: '100%',
  },
  iconBGExpens: {
    backgroundColor: '#FFE9E6',
    padding: 15,
    borderRadius: 20,
  },

  iconBGIncome: {
    backgroundColor: '#D8FFE5',
    padding: 15,
    borderRadius: 20,
  },

  info: {
    justifyContent: 'space-evenly',
    marginLeft: 20,
  },

  iconsInfo: {
    flexDirection: 'row',
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
  },

  date: {
    width: '100%',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
  },

  sumMinus: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: '#F6543E',
  },

  sumPlus: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: '#2FBC5F',
  },

  imgExpenses: {
    tintColor: '#F6543E',
  },

  imgIncome: {
    tintColor: '#2FBC5F',
  },
});

export default Transactions;
