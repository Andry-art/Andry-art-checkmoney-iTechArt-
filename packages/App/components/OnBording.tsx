import React, {useCallback, useRef, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import slides from '../slides';
import OnBordingItem from './OnBordingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';

const keyExtractor = (item: any) => item.id.toString();

const viewability = {
  viewAreaCoveragePercentThreshold: 10,
};

const OnBording = () => {
  const [itemVisible, setItemVisible] = useState({index: 0});

  let viewableItemsChanged = useCallback(({viewableItems}: any) => {
    setItemVisible(viewableItems[0]);
  }, []);

  const slideRef = useRef(null);

  const scrollTo = () => {
    if (itemVisible.index < slides.length - 1) {
      slideRef.current?.scrollToIndex({index: itemVisible.index + 1});
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
          renderItem={({item}) => <OnBordingItem item={item} />}
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

export default OnBording;
