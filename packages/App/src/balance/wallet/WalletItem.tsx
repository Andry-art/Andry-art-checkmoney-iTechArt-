import React, {FC, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  Image,
  Platform,
  UIManager,
  Animated,
  LayoutAnimation,
} from 'react-native';
import walletIconSource from '../../../Pics/balance/wallet.png';
import {AmountInCents} from '../../types/types';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  title: string;
  amount: AmountInCents;
  color: string;
  onLongPress: (id: number) => void;
  keyCard: number;
  onPress: (key: number, amount: number, title: string) => void;
}

const WalletItem: FC<Props> = ({
  title,
  amount,
  color,
  onLongPress,
  keyCard,
  onPress,
}) => {
  const {width} = useWindowDimensions();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, {width}],
    [width],
  );

  const backgroundColor = useMemo<StyleProp<ViewStyle>>(
    () => [styles.card, {backgroundColor: color}],
    [color],
  );

  LayoutAnimation.easeInEaseOut();

  const onLongPressCallBack = useCallback(() => {
    onLongPress(keyCard);
  }, [keyCard, onLongPress]);

  const onPressCallBack = useCallback(() => {
    onPress(keyCard, amount, title);
  }, [amount, keyCard, onPress, title]);

  return (
    <Animated.View style={viewStyle}>
      <TouchableOpacity
        style={backgroundColor}
        onLongPress={onLongPressCallBack}
        onPress={onPressCallBack}>
        <View style={styles.cardTitle}>
          <Image source={walletIconSource} />
          <Text style={styles.cardTitleText}>{title}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>{amount}$</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
