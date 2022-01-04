import React, {Dispatch, FC, SetStateAction, useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface Props {
  color: string;
  onPress: Dispatch<SetStateAction<string>>;
}

const ColorsNewCard: FC<Props> = ({color, onPress}) => {
  const styler = useMemo<StyleProp<ViewStyle>>(() => {
    return [styles.colorsItems, {backgroundColor: color}];
  }, [color]);

  const onPressCallBack = useCallback(() => {
    onPress(color);
  }, [color, onPress]);

  return <TouchableOpacity style={styler} onPress={onPressCallBack} />;
};

const styles = StyleSheet.create({
  colorsItems: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});

export default ColorsNewCard;
