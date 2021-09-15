import React, { useEffect } from "react";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");

const VELOCITY_THRESHOLD = 500;

const SPRING_CFG = {
  stiffness: 50,
  mass: 0.5,
  damping: 10,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

interface BottomSheetProps extends ViewProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isVisible,
  onDismiss,
}) => {
  const yOffset = useSharedValue(height);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    yOffset.value = withSpring(isVisible ? 0 : height, SPRING_CFG);
  }, [isVisible]);

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (_, ctx) => {
      ctx.startY = yOffset.value;
    },
    onActive: ({ translationY }, ctx) => {
      if (translationY > 0) {
        yOffset.value = ctx.startY + translationY;
      }
    },
    onEnd: ({ velocityY, translationY }, ctx) => {
      if (
        velocityY > VELOCITY_THRESHOLD ||
        translationY > contentHeight.value / 2
      ) {
        runOnJS(onDismiss)();
      } else {
        yOffset.value = withSpring(ctx.startY, SPRING_CFG);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yOffset.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TapGestureHandler onEnded={onDismiss}>
        <View style={styles.bg} />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View
          style={styles.content}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => {
            contentHeight.value = height;
          }}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height,
    justifyContent: "flex-end",
  },
  handle: {
    position: "absolute",
    top: 5,
    left: (width - 50) / 2,
    height: 5,
    width: 50,
    backgroundColor: "lightgray",
    borderRadius: 4,
  },
  content: {
    backgroundColor: "white",
    padding: 15,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default BottomSheet;
