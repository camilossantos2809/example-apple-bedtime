import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { polar2Canvas, Vector } from "react-native-redash";
import { Circle } from "react-native-svg";

import { STROKE, R, CENTER } from "./Constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
}

const Cursor = ({ pos }: CursorProps) => {
  const animatedProps = useAnimatedProps(() => ({
    cx: pos.value.x,
    cy: pos.value.y,
  }));
  return (
    <AnimatedCircle r={STROKE / 2} animatedProps={animatedProps} fill="blue" />
  );
};

export default Cursor;
