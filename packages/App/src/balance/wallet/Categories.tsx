import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import iconCarSource from '../../../Pics/balance/car.png';

const Categories = ({item}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsInfo}>
        <View style={styles.iconBG}>
          <Image source={iconCarSource} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Auto</Text>
          <Text style={styles.date}>20.01.2020</Text>
        </View>
      </View>
      <Text style={styles.sum}>{item.balance}</Text>
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

  sum: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
  },
});

export default Categories;
