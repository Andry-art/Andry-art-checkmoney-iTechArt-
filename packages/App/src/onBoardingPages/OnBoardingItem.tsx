/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Image, useWindowDimensions, StyleSheet, Text} from 'react-native';
import {OnBoardingInfo} from './OnBoarding';

interface Props {
  item: OnBoardingInfo;
}

const OnBoardingItem: FC<Props> = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.img, {width, resizeMode: 'contain'}]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 10,
    color: 'darkblue',
    textAlign: 'center',
  },

  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
});

export default OnBoardingItem;
