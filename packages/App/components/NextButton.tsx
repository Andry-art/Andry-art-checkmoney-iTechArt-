import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const NextButton = ({page, scrollTo}: any) => {
  const progress = (page.index + 1) * (100 / 3);
  const size = 110;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnim = useRef(new Animated.Value(0)).current;

  let progressRef = useRef(null);

  // const progres = circumference - (circumference * progress) / 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  useEffect(() => {
    progressAnim.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({strokeDashoffset});
      }
    });
  }, [progress]);

  return (
    <View style={styles.nextBtn}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E2E2E2"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          ref={progressRef}
          stroke="red"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={scrollTo}>
        <Image
          source={require('../Pics/right-arrow.png')}
          style={[styles.errow, {transform: [{rotate: '90 deg'}]}]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    transform: [{rotate: '-90 deg'}],
  },
  button: {
    position: 'absolute',
    backgroundColor: 'darkblue',
    borderRadius: 100,
    padding: 20,
  },

  errow: {
    width: 50,
    height: 50,
  },
});

export default NextButton;
