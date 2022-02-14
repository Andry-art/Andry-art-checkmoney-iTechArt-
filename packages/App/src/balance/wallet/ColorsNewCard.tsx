import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  color: Array<string>;
  onPress: Dispatch<SetStateAction<Array<string>>>;
}

const ColorsNewCard: FC<Props> = ({color, onPress}) => {
  const onPressCallBack = useCallback(() => {
    onPress(color);
  }, [color, onPress]);

  return (
    <TouchableOpacity onPress={onPressCallBack}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={color}
        style={styles.colorsItems}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorsItems: {
    width: 55,
    height: 45,
    borderRadius: 10,
  },
});

export default ColorsNewCard;
