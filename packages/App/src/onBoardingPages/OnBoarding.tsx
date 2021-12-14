import React, {FC, useCallback, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, ImageSourcePropType} from 'react-native';
import slides from '../../slides';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';

export interface OnBoardingInfo {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const keyExtractor = (item: OnBoardingInfo) => item.id.toString();

const viewability: object = {
  viewAreaCoveragePercentThreshold: 10,
};

const OnBoarding: FC = () => {
  const [itemVisible, setItemVisible] = useState<number>(0);

  let viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  const slideRef = useRef<FlatList>(null);

  const scrollTo = () => {
    if (itemVisible < slides.length - 1) {
      slideRef.current?.scrollToIndex({index: itemVisible + 1});
    } else {
      console.log('we are done');
    }
  };

  return (
    <View>
      <View style={styles.list}>
        <FlatList
          data={slides}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          viewabilityConfig={viewability}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slideRef}
        />
      </View>
      <Paginator data={slides} item={itemVisible} />
      <NextButton page={itemVisible} scrollTo={scrollTo} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '70%',
    marginBottom: 20,
  },
});

export default OnBoarding;
