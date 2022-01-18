import React, {FC, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AmountInCents} from '../../types/types';

interface Props {
  title: string;
  amount: AmountInCents;
  color: Array<string>;
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

  const onLongPressCallBack = useCallback(() => {
    onLongPress(keyCard);
  }, [keyCard, onLongPress]);

  const onPressCallBack = useCallback(() => {
    onPress(keyCard, amount, title);
  }, [amount, keyCard, onPress, title]);

  return (
    <View style={viewStyle}>
      <TouchableOpacity
        onLongPress={onLongPressCallBack}
        onPress={onPressCallBack}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={color ? color : ['#F39034', '#FF2727']}
          style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitleText}>{title}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>{amount}$</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },

  card: {
    justifyContent: 'flex-start',
    backgroundColor: '#74EA8E',
    height: 200,
    borderRadius: 30,
    marginHorizontal: 35,
    padding: 24,
    elevation: 3,
  },

  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
  },

  cardTitleText: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
  },

  total: {
    marginTop: 8,
  },

  totalText: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 26,
  },
});

export default WalletItem;
