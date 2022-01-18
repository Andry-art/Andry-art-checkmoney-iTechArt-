import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface Props {
  label: string;
  styleBtn?: any;
  styleTxt?: any;
  onPress?: () => void;
}

const ButtonApp: FC<Props> = ({label, styleBtn, styleTxt, onPress}) => {
  return (
    <TouchableOpacity style={styleBtn} onPress={onPress}>
      <Text style={styleTxt}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonApp;
