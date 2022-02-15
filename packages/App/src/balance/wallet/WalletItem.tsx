import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import {AmountInCents, WalletNavigatorList} from '../../types/types';

interface Props {
  title: string;
  amount: AmountInCents;
  color: Array<string>;
  onLongPress: (id: number) => void;
  keyCard: number;
  onPress: (key: number, amount: number, title: string) => void;
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const WalletItem: FC<Props> = ({
  title,
  amount,
  color,
  onLongPress,
  keyCard,
  onPress,
  navigation
}) => {
  const {width} = useWindowDimensions();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, {width}],
    [width],
  );

  const newCard = () => {
    navigation.navigate('New Card');
  };

  const onLongPressCallBack = useCallback(() => {
    onLongPress(keyCard);
  }, [keyCard, onLongPress]);

  const onPressCallBack = useCallback(() => {
    onPress(keyCard, amount, title);
  }, [amount, keyCard, onPress, title]);

  return (
    <View style={viewStyle}>
      {keyCard === -1 ?   <TouchableOpacity
        onPress={newCard}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={color ? color : ['#F39034', '#FF2727']}
          style={styles.newCard}>
       <Text style = {styles.plus}>+</Text>    
        </LinearGradient>
      </TouchableOpacity> 
      : 
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
            <Text style={styles.totalText}>
              {Math.round(amount * 100) / 100}$
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },

  plus: {
    fontSize: 60,
    color: 'white',
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

  newCard:{
    alignItems: 'center',
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
