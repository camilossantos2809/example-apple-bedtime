import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

const CircularSlider = ({ start, end }: CircularProps) => {
  // Cartesian representation
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      d: `M ${startPos.value.x} ${startPos.value.y} A ${R} ${R} 0 1 0 ${endPos.value.x} ${endPos.value.y}`,
    };
  });

  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              animatedProps={animatedProps}
              stroke="cyan"
              strokeWidth={STROKE}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} />
        <Cursor pos={endPos} />
      </Svg>
    </View>
  );
};

export default CircularSlider;
