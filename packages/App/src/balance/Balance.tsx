import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {walletsAmount} from '../store/selectors/walletItems';
import {useSelector} from 'react-redux';
import {sumDebitsToYou, sumOfYourDebits} from '../store/selectors/debits';

const Balance = ({navigation}: any) => {
  const handleWalletPress = () => {
    navigation.navigate('BalanceWallet');
  };

  const handleDebitsPress = () => {
    navigation.navigate('Debits');
  };

  const receivedSum = useSelector(walletsAmount);
  const sumDebToYou = useSelector(sumDebitsToYou);
  const sumOfYourDeb = useSelector(sumOfYourDebits);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wallet} onPress={handleWalletPress}>
        <Text style={styles.title}>Wallet</Text>
        <Text>{receivedSum}$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.debits} onPress={handleDebitsPress}>
        <Text style={styles.title}>Debits</Text>
        <View style={styles.debitsNumbers}>
          <Text style={styles.plus}>{sumDebToYou}$</Text>
          <Text style={styles.minus}>{sumOfYourDeb}$</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.credits}>
        <Text style={styles.title}>Credits</Text>
        <Text>5700$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  wallet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#74EA8E',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  debits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#4C96BF',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  credits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#EA7474',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  debitsNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  plus: {
    color: 'green',
    marginRight: 20,
  },

  minus: {
    color: 'red',
  },
});

export default Balance;