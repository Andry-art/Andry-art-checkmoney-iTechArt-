import React, {FC} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DebitInfo} from '../../types/types';

interface Props {
  type: string;
  keyOfWallet: number;
  keyDeb: number;
  date: string;
  person: string;
  amount: number;
  color: string;
  onPress: ({
    keyOfWallet,
    keyTransaction,
    date,
    person,
    amountTransaction,
  }: DebitInfo) => void;
  onLongPress: ({
    type,
    keyOfWallet,
    keyTransaction,
    date,
    person,
    amountTransaction,
  }: DebitInfo) => void;
  lastKey: number;
}

const ListOfDebits: FC<Props> = ({
  type,
  keyOfWallet,
  keyDeb,
  date,
  person,
  amount,
  color,
  onPress,
  onLongPress,
  lastKey,
}) => {
  const chosenDebt = () => {
    const keyTransaction = keyDeb;
    const amountTransaction = amount;
    onPress({
      type,
      keyOfWallet,
      keyTransaction,
      date,
      person,
      amountTransaction,
    });
  };

  const chosenDebtOnLongPress = () => {
    const keyTransaction = keyDeb;
    const amountTransaction = amount;
    onLongPress({
      type,
      keyOfWallet,
      keyTransaction,
      date,
      person,
      amountTransaction,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={keyDeb === lastKey ? styles.lastItem : styles.listItem}
        onPress={chosenDebt}
        onLongPress={chosenDebtOnLongPress}>
        <Text style={styles.textName}>{person}</Text>
        <Text style={[styles.textAmount, {color}]}>{amount}$</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#404CB2',
  },

  lastItem: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },

  textName: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  textAmount: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ListOfDebits;
