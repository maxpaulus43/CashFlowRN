import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

interface NumberPickerProps {
  increment?: number;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChangeValue: (n: number) => void | undefined;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  initialValue,
  increment = 1000,
  minValue,
  maxValue,
  onChangeValue,
}) => {
  const [value, setValue] = useState(initialValue ?? increment);

  const decr = () => {
    const newValue = value - increment;
    if (newValue >= (minValue ?? 0)) {
      setValue(newValue);
      onChangeValue(newValue);
    }
  };
  const incr = () => {
    const newValue = value + increment;
    if (maxValue === undefined || newValue <= maxValue) {
      setValue(newValue);
      onChangeValue(newValue);
    }
  };

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { lastActive: number }
  >({
    onStart: (_, ctx) => {
      ctx.lastActive = 0;
    },
    onActive: ({ translationY }, ctx) => {
      if (translationY - ctx.lastActive > 15) {
        ctx.lastActive = translationY;
        runOnJS(decr)();
      } else if (translationY - ctx.lastActive < -15) {
        runOnJS(incr)();
        ctx.lastActive = translationY;
      }
    },
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler onEnded={decr}>
        <View>
          <Text>➖</Text>
        </View>
      </TapGestureHandler>

      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View>
          <Text>{value}</Text>
        </Animated.View>
      </PanGestureHandler>

      <TapGestureHandler onEnded={incr}>
        <View>
          <Text>➕</Text>
        </View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default NumberPicker;
