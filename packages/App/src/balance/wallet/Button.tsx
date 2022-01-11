import React, {FC, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageURISource,
} from 'react-native';
import {useSelector} from 'react-redux';
import {filtersError} from '../../store/selectors/walletItems';

interface Props {
  title: string;
  picture: ImageURISource;
  onPress: (title: string) => void;
  chosen: string;
}

const Button: FC<Props> = ({title, picture, onPress, chosen}) => {
  const chooseBtn = () => {
    onPress(title);
  };

  const errorFilters = useSelector(filtersError);

  if (errorFilters) {
    chosen = 'All actions';
  }

  const chosenColor = useMemo(() => {
    return [styles.button, {backgroundColor: '#EBEDF8'}];
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={chosen === title ? chosenColor : styles.button}
        onPress={chooseBtn}>
        <Image source={picture} />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

    padding: 20,
    borderRadius: 100,
  },
});

export default Button;
