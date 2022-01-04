import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
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

export interface OnBoardingInfo {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

interface Props {
  setViewOnBoarding: Dispatch<SetStateAction<boolean>>;
}

const keyExtractor = (item: OnBoardingInfo) => item.id.toString();

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

const OnBoarding: FC<Props> = ({setViewOnBoarding}) => {
  const [itemVisible, setItemVisible] = useState<number>(0);

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    console.log(viewableItems[0].index);
    // setItemVisible(viewableItems[0].index);
  }, []);

  const slideRef = useRef<FlatList>(null);

  const scrollToNext = useCallback(async () => {
    if (itemVisible < slides.length - 1) {
      slideRef.current?.scrollToIndex({index: itemVisible + 1});
    } else {
      setViewOnBoarding(true);
      console.log('we are done');
    }
  }, [itemVisible, setViewOnBoarding]);

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OnBoarding;
