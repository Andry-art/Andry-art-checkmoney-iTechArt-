import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  Image,
} from 'react-native';

import walletIconSource from '../../../Pics/balance/wallet.png';

const WalletItem = ({item}: any) => {
  const {width} = useWindowDimensions();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, {width}],
    [width],
  );

  return (
    <View style={viewStyle}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardTitle}>
          <Image source={walletIconSource} />
          <Text style={styles.cardTitleText}>Cash</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>{item.balance}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#CBE5F2',
  },

  card: {
    justifyContent: 'flex-start',
    backgroundColor: '#74EA8E',
    height: '100%',
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },

  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardTitleText: {
    marginLeft: 20,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  },

  total: {
    alignItems: 'center',
    margin: 10,
  },

  totalText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default WalletItem;