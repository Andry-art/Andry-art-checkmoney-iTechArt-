import React, {FC, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import iconCarSource from '../../../Pics/categories/car.png';
import iconHealthSource from '../../../Pics/categories/heart-beat.png';
import iconGrocerySource from '../../../Pics/categories/food.png';
import iconUnknownSource from '../../../Pics/categories/question.png';
import iconShoppingSource from '../../../Pics/categories/shop-bag.png';
import iconRestaurantSource from '../../../Pics/categories/restaurant.png';
import iconSalarySource from '../../../Pics/categories/money.png';
import {AmountInCents} from '../../types/types';

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
        <View style={styles.iconBG}>
          <Image source={img} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      {type === 'income' ? (
        <Text style={styles.sumPlus}>+{amount}$</Text>
      ) : (
        <Text style={styles.sumMinus}>-{amount}$</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  iconBG: {
    backgroundColor: '#32A7E9',
    padding: 20,
    borderRadius: 100,
  },

  info: {
    justifyContent: 'space-evenly',
    marginLeft: 20,
  },

  iconsInfo: {
    flexDirection: 'row',
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
  },

  date: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
  },

  sumMinus: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: 'red',
  },

  sumPlus: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    color: 'green',
  },
});

export default Transactions;
