import React, {FC, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  chosenCard: number;
  cardKey: number;
  amount: number;
  title: string;
  color: string;
  onPress: (key: number) => void;
};

const ListOFCards: FC<Props> = ({
  chosenCard,
  cardKey,
  amount,
  title,
  color,
  onPress,
}) => {
  const cardColor = useMemo(() => {
    return [styles.card, {backgroundColor: color}];
  }, [color]);

  const cardColorChosen = useMemo(() => {
    return [
      styles.card,
      {backgroundColor: color, borderColor: '#9098AD', borderWidth: 5},
    ];
  }, [color]);

  const getCardKey = useCallback(() => {
    onPress(cardKey);
  }, [cardKey, onPress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={chosenCard === cardKey ? cardColorChosen : cardColor}
        onPress={getCardKey}>
        <Text style={styles.textAmount}>{amount}$</Text>
      </TouchableOpacity>
      <Text style={chosenCard === cardKey ? styles.titleChosen : styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: 100,
    height: 70,
    backgroundColor: 'yellow',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textAmount: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
  },

  titleChosen: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 17,
  },
});

export default ListOFCards;
