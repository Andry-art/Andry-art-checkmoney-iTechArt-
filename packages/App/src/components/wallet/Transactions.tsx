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
import {AmountInCents} from '../../types/types';
import {TransactionType} from '../../types/types';
import dayjs from 'dayjs';

interface Props {
  keyTransaction: number;
  category: string;
  amount: AmountInCents;
  date: string;
  type: string;
  icon: string;
  onLongPress: (keyTransaction: number, amount: number, type: string) => void;
  onPress: (
    keyTransaction: number,
    category: string,
    date: string,
    amount: number,
    type: string,
    icon: string,
  ) => void;
}

const Transactions: FC<Props> = ({
  keyTransaction,
  category,
  amount,
  date,
  type,
  icon,
  onLongPress,
  onPress,
}) => {
  const imgSource: Record<string, ImageSourcePropType> = {
    iconCarSource: iconCarSource,
    iconHealthSource: iconHealthSource,
    iconUnknownSource: iconUnknownSource,
    iconGrocerySource: iconGrocerySource,
    iconShoppingSource: iconShoppingSource,
    iconRestaurantSource: iconRestaurantSource,
    iconSalarySource: iconSalarySource,
  };

  const img = imgSource[icon];

  const onLongPressCallBack = useCallback(() => {
    onLongPress(keyTransaction, amount, type);
  }, [amount, keyTransaction, onLongPress, type]);

  const onPressCallBack = useCallback(() => {
    onPress(keyTransaction, category, date, amount, type, icon);
  }, [amount, category, date, icon, keyTransaction, onPress, type]);

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={onLongPressCallBack}
      onPress={onPressCallBack}>
      <View style={styles.iconsInfo}>
        <View
          style={
            type === TransactionType.income
              ? styles.iconBGIncome
              : styles.iconBGExpens
          }>
          <Image
            source={img}
            style={
              type === TransactionType.income
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
      {type === TransactionType.income ? (
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
