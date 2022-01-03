import React, {Dispatch, FC, SetStateAction, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {ChosenCategory} from '../../types/types';
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
  picture: string;
  chosen: ChosenCategory;
  onPress: Dispatch<SetStateAction<ChosenCategory>>;
}

const CategoriesInAddMoneyMove: FC<Props> = ({picture, chosen, onPress}) => {
  const img = imgSource[picture];
  const title = text[picture];
  const chosenStyle = useMemo(
    () => [styles.icon, {backgroundColor: '#0096E9'}],
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chosenCategory = (icon: string, category: string) => {
    onPress({icon, category});
  };

  const chosenCategoryCallback = useCallback(() => {
    chosenCategory(picture, title);
  }, [chosenCategory, picture, title]);

  return (
    <TouchableOpacity style={styles.container} onPress={chosenCategoryCallback}>
      <View style={chosen.icon === picture ? chosenStyle : styles.icon}>
        <Image source={img} />
      </View>
      <Text
        style={
          chosen.icon === picture ? styles.chosenText : styles.notchosenText
        }>
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
