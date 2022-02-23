/* eslint-disable react-native/no-inline-styles */
import React, {FC, useMemo} from 'react';
import {ViewStyle, StyleProp, ImageStyle} from 'react-native';
import {View, Image, useWindowDimensions, StyleSheet, Text} from 'react-native';
import {OnBoardingInfo} from './OnBoarding';

interface Props {
  item: OnBoardingInfo;
}

const OnBoardingItem: FC<Props> = ({item}) => {
  const {width} = useWindowDimensions();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, {width}],
    [width],
  );
  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => [styles.img, {width}],
    [width],
  );

  return (
    <View style={viewStyle}>
      <Image source={item.image} style={imageStyle} />
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
    resizeMode: 'contain',
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
