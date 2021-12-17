import React, {FC, useCallback, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageSourcePropType,
  ViewabilityConfig,
} from 'react-native';
import slides from '../../slides';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OnBoardingInfo {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const keyExtractor = (item: OnBoardingInfo) => item.id.toString();

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

const OnBoarding: FC = ({setViewOnBoarding}: any) => {
  const [itemVisible, setItemVisible] = useState<number>(0);

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  const slideRef = useRef<FlatList>(null);

  const scrollToNext = useCallback(async () => {
    if (itemVisible < slides.length - 1) {
      slideRef.current?.scrollToIndex({index: itemVisible + 1});
    } else {
      try {
        // await AsyncStorage.setItem('@viewedOnBoarding', 'true');
        setViewOnBoarding(true);
      } catch (e) {
        console.log(e);
      }
    }
  }, [itemVisible, setViewOnBoarding]);

  return (
    <View style={styles.onBoard}>
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
      <NextButton page={itemVisible} scrollToNext={scrollToNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '70%',
    marginBottom: 20,
  },
  onBoard: {
    backgroundColor: 'white',
  },
});

export default OnBoarding;
