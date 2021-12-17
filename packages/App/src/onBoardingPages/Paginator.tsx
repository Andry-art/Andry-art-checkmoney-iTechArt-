import React, {FC} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {OnBoardingInfo} from './OnBoarding';

interface Props {
  data: Array<any>;
  item: number;
}

const Paginator: FC<Props> = ({data, item}) => {
  return (
    <View style={styles.pag}>
      {data.map((it: OnBoardingInfo) => {
        return (
          <Animated.View
            style={it.id === item ? styles.dotActive : styles.dotInactive}
            key={it.id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  dotActive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'darkblue',
    marginHorizontal: 8,
  },
  dotInactive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginHorizontal: 8,
    opacity: 0.5,
  },
});

export default Paginator;
