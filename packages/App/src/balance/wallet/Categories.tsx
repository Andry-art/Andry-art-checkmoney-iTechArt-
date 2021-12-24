import React, {FC} from 'react';
import {StyleSheet, View, Text, Image, ImageURISource} from 'react-native';

type AmountInCents = number;

interface Props {
  category: string;
  amount: AmountInCents;
  date: string;
  type: string;
  icon: ImageURISource;
}

const Categories: FC<Props> = ({category, amount, date, type, icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsInfo}>
        <View style={styles.iconBG}>
          <Image source={icon} />
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
    fontSize: 14,
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
