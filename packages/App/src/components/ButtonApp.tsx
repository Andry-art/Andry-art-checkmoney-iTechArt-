import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Props {
  label: string;
  styleBtn?: any;
  styleTxt?: any;
  func?: any;
}

const ButtonApp: FC<Props> = ({label, styleBtn, styleTxt, func}) => {
  return (
    <TouchableOpacity style={styleBtn} onPress={func}>
      <Text style={styleTxt}>{label}</Text>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({

// });

export default ButtonApp;
