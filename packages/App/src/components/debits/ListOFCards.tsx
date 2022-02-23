import React, {FC, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import dollarImgSource from '../../../pictures/debt/dollar.png';

type Props = {
  chosenCard: number;
  cardKey: number;
  amount: number;
  title: string;
  onPress: (key: number) => void;
};

const ListOFCards: FC<Props> = ({
  chosenCard,
  cardKey,
  amount,
  title,
  onPress,
}) => {
  const cardColorChosen = useMemo(() => {
    return [styles.card, {borderColor: '#9098AD', borderWidth: 5}];
  }, []);

  const getCardKey = useCallback(() => {
    onPress(cardKey);
  }, [cardKey, onPress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={chosenCard === cardKey ? cardColorChosen : styles.card}
        onPress={getCardKey}>
        <View style={styles.titleCard}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textAmount}>
            {Math.round(amount * 100) / 100}$
          </Text>
        </View>
        <Image source={dollarImgSource} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    width: 240,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    padding: 15,
  },

  textAmount: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    color: '#001026',
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#001026',
  },

  titleCard: {
    justifyContent: 'space-between',
  },

  img: {
    width: '30%',
    height: '90%',
  },
});

export default ListOFCards;
