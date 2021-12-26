import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {WalletItems} from '../store/selectors/walletItems';
import {useSelector} from 'react-redux';

const Balance = ({navigation}: any) => {
  const handleWalletPress = () => {
    navigation.navigate('BalanceWallet');
  };

  const receivedWalletItems = useSelector(WalletItems);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wallet} onPress={handleWalletPress}>
        <Text style={styles.title}>Wallet</Text>
        <Text>
          {receivedWalletItems.reduce((sum, cur) => {
            return (sum * 100 + cur.walletAmount * 100) / 100;
          }, 0)}
          $
        </Text>
      </TouchableOpacity>

      <View style={styles.debits}>
        <Text style={styles.title}>Debits</Text>
        <View style={styles.debitsNumbers}>
          <Text style={styles.plus}>70$</Text>
          <Text style={styles.minus}>30$</Text>
        </View>
      </View>

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
