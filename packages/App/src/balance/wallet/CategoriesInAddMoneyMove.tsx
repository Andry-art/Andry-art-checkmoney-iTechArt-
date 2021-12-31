import React, {Dispatch, FC, SetStateAction, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import iconCarSource from '../../../Pics/categories/car.png';
import iconHealthSource from '../../../Pics/categories/heart-beat.png';
import iconGrocerySource from '../../../Pics/categories/food.png';
import iconUnknownSource from '../../../Pics/categories/question.png';
import iconShoppingSource from '../../../Pics/categories/shop-bag.png';
import iconRestaurantSource from '../../../Pics/categories/restaurant.png';
import iconSalarySource from '../../../Pics/categories/money.png';

const imgSource: Record<string, ImageSourcePropType> = {
  iconCarSource: iconCarSource,
  iconHealthSource: iconHealthSource,
  iconUnknownSource: iconUnknownSource,
  iconGrocerySource: iconGrocerySource,
  iconShoppingSource: iconShoppingSource,
  iconRestaurantSource: iconRestaurantSource,
  iconSalarySource: iconSalarySource,
};

const text: Record<string, string> = {
  iconCarSource: 'Car',
  iconHealthSource: 'Health',
  iconUnknownSource: 'UnKnown',
  iconGrocerySource: 'Grocery',
  iconShoppingSource: 'Shopping',
  iconRestaurantSource: 'Restaurant',
  iconSalarySource: 'Salary',
};

interface Props {
  pic: string;
  chosen: {icon: string; category: string};
  onPress: Dispatch<SetStateAction<{icon: string; category: string}>>;
}

const CategoriesInAddMoneyMove: FC<Props> = ({pic, chosen, onPress}) => {
  const img = imgSource[pic];
  const title = text[pic];
  const chosenStyle = useMemo(
    () => [styles.icon, {backgroundColor: '#0096E9'}],
    [],
  );

  const chosenCategory = (icon: string, category: string) => {
    onPress({icon, category});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => chosenCategory(pic, title)}>
      <View style={chosen.icon === pic ? chosenStyle : styles.icon}>
        <Image source={img} />
      </View>
      <Text
        style={chosen.icon === pic ? styles.chosenText : styles.notchosenText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: '#7CD0FF',
    padding: 15,
    borderRadius: 100,
  },

  chosenText: {
    fontWeight: '700',
  },

  notchosenText: {},
});

export default CategoriesInAddMoneyMove;
