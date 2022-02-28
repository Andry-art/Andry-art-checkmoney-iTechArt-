import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ImageURISource} from 'react-native';
import {useSelector} from 'react-redux';
import {filtersError} from '../../store/selectors/WalletSelectors';

interface Props {
  title: string;
  picture: ImageURISource;
  onPress: (title: string) => void;
  chosen: string;
}

const Button: FC<Props> = ({title, onPress, chosen}) => {
  const chooseBtn = () => {
    onPress(title);
  };

  const errorFilters = useSelector(filtersError);

  if (errorFilters) {
    chosen = 'All actions';
  }

  const chosenColor = useMemo(() => {
    return [styles.button, {backgroundColor: '#FFFFFF'}];
  }, []);

  return (
    <TouchableOpacity
      style={chosen === title ? chosenColor : styles.buttonNotActive}
      onPress={chooseBtn}>
      <Text style={chosen === title ? styles.chosenText : styles.notchosenText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonNotActive: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  chosenText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'black',
  },

  notchosenText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#C0C0C0',
  },
});

export default Button;
