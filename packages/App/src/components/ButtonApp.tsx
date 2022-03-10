import React, {FC} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

interface Props {
  disabled?: boolean;
  label: string;
  styleBtn?: any;
  styleTxt?: any;
  onPress?: () => void;
  image?: any;
}

const ButtonApp: FC<Props> = ({
  label,
  styleBtn,
  styleTxt,
  onPress,
  disabled,
  image,
}) => {
  return (
    <TouchableOpacity
      style={styleBtn ? styleBtn : styles.btn}
      onPress={onPress}
      disabled={disabled}>
      <Image source={image} style={styles.img} />
      <Text style={styleTxt ? styleTxt : styles.text}>{label}</Text>
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
