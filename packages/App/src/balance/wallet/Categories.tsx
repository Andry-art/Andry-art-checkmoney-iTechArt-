import React, {FC} from 'react';
import {StyleSheet, View, Text, Image, ImageSourcePropType} from 'react-native';
import iconCarSource from '../../../Pics/categories/car.png';
import iconHealthSource from '../../../Pics/categories/heart-beat.png';
import iconGrocerySource from '../../../Pics/categories/food.png';
import iconUnknownSource from '../../../Pics/categories/question.png';
import iconShoppingSource from '../../../Pics/categories/shop-bag.png';
import iconRestaurantSource from '../../../Pics/categories/restaurant.png';
import iconSalarySource from '../../../Pics/categories/money.png';
import {AmountInCents} from '../../types/types';

interface Props {
  category: string;
  amount: AmountInCents;
  date: string;
  type: string;
  icon: string;
}

const Categories: FC<Props> = ({category, amount, date, type, icon}) => {
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

  return (
    <View style={styles.container}>
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
    </View>
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

export default Categories;
