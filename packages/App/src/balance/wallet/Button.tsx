import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageURISource,
} from 'react-native';

interface Props {
  title: string;
  picture: ImageURISource;
  onPress: () => void;
}

const Button: FC<Props> = ({title, picture, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
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
    backgroundColor: '#C7F8FF',
    padding: 20,
    borderRadius: 10,
  },
});

export default Button;
