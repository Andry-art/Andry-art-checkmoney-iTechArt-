import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import iconUnknownSource from '../../pictures/categories/question.png';
// import addTransactionSource from '../../pictures/balance/income.png';
// import confirmSource from '../../pictures/balance/basic-tick.png';
// import walletSource from '../../pictures/balance/wallet.png';
// import plusSource from '../../pictures/debt/plus.png';
// import minusSource from '../../pictures/debt/minus.png';

interface Props {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
}

// const imgSource: Record<string, ImageSourcePropType> = {
//   addTransaction: addTransactionSource,
//   correct: confirmSource,
//   addCard: walletSource,
//   addDebit: plusSource,
//   deleteDebit: minusSource,
// };

const ButtonApp: FC<Props> = ({
  label,
  onPress,
  disabled,
  image = iconUnknownSource,
}) => {
  // const imgRender: ImageSourcePropType = imgSource[image];

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={disabled}>
      <Image source={image} style={styles.img} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    height: 100,
    width: '100%',
    backgroundColor: '#404CB2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },

  text: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },

  img: {
    position: 'absolute',
    left: 20,
    tintColor: 'white',
  },
});

export default ButtonApp;
