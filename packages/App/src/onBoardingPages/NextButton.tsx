import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import img from '../../Pics/right-arrow.png';

interface Props {
  page: number;
  scrollTo: Function;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const NextButton: FC<Props> = ({page, scrollTo}) => {
  const percent: number = (page + 1) * (100 / 3);
  const size: number = 110;
  const strokeWidth: number = 4;
  const center: number = size / 2;
  const radius: number = size / 2 - strokeWidth / 2;
  const circumference: number = 2 * Math.PI * radius;
  const animationProg = useSharedValue<number>(0);

  useEffect(() => {
    animationProg.value = withTiming(percent, {duration: 300});
  }, [animationProg, percent]);

  const animatedProps = useAnimatedProps(() => {
    const progress: number =
      circumference - (circumference * animationProg.value) / 100;
    return {
      strokeDashoffset: progress,
    };
  });

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
        <AnimatedCircle
          stroke="red"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={() => scrollTo()}>
        <Image
          source={img}
          style={[styles.arrow, {transform: [{rotate: '90 deg'}]}]}
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

  arrow: {
    width: 50,
    height: 50,
  },
});

export default NextButton;