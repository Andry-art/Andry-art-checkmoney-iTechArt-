import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const Paginator = ({data, item}: any) => {
  return (
    <View style={styles.pag}>
      {item ? (
        data.map((it: any) => {
          return (
            <Animated.View
              style={it.id === item.index + 1 ? styles.dot : styles.dot2}
              key={it.id}
            />
          );
        })
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'darkblue',
    marginHorizontal: 8,
  },
  dot2: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginHorizontal: 8,
    opacity: 0.5,
  },
});

export default Paginator;
