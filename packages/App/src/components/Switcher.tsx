import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import imgArrowSource from '../../pictures/double-arrow.png';

interface Props {
  onPressFirst: () => void;
  onPressSecond: () => void;
  titleFirst: string;
  titleSecond: string;
  choosenBtn: string;
}

const Switcher: FC<Props> = ({
  onPressFirst,
  onPressSecond,
  titleFirst,
  titleSecond,
  choosenBtn,
}) => {
  return (
    <View style={styles.moneyMoves}>
      <TouchableOpacity
        style={choosenBtn === titleFirst ? styles.btnFocus : styles.btn}
        onPress={onPressFirst}>
        <Text style={styles.textIncomeExpenses}>{titleFirst}</Text>
      </TouchableOpacity>
      <Image source={imgArrowSource} />
      <TouchableOpacity
        style={choosenBtn === titleSecond ? styles.btnFocus : styles.btn}>
        <Text style={styles.textIncomeExpenses} onPress={onPressSecond}>
          {titleSecond}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  moneyMoves: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textIncomeExpenses: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },

  btnFocus: {
    height: 40,
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },

  btn: {
    height: 40,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },
});

export default Switcher;
