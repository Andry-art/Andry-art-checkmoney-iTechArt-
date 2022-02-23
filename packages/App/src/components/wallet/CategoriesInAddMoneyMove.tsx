import React, {Dispatch, FC, SetStateAction} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ChosenCategory} from '../../types/types';

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
  const title = text[picture];

  const chosenCategory = () => {
    const category = title;
    const icon = picture;
    onPress({icon, category});
  };

  return (
    <TouchableOpacity
      style={
        chosen.icon === picture ? styles.containerActive : styles.container
      }
      onPress={chosenCategory}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  containerActive: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  icon: {
    margin: 10,
    marginBottom: 0,
    padding: 15,
    borderRadius: 100,
  },

  chosenText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'black',
  },

  notchosenText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#C0C0C0',
  },
});

export default CategoriesInAddMoneyMove;
