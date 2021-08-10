import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const DRAG_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

const SideSheet: React.FC = ({ children }) => {
  const xOffset = useSharedValue(-width);
  const cfg = {
    stiffness: 50,
    mass: 0.5,
    damping: 10,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };
  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = xOffset.value;
    },
    onActive: (event, ctx) => {
      xOffset.value = ctx.startX + event.translationX;
    },
    onEnd: ({ velocityX, translationX }, ctx) => {
      if (velocityX > VELOCITY_THRESHOLD || translationX > DRAG_THRESHOLD) {
        xOffset.value = withSpring(0, cfg);
      } else if (
        velocityX < -VELOCITY_THRESHOLD ||
        translationX < -DRAG_THRESHOLD
      ) {
        xOffset.value = withSpring(-width, cfg);
      } else {
        xOffset.value = withSpring(ctx.startX, cfg);
      }
    },
  });
  const balanceSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xOffset.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View
        style={[
          {
            width,
            height,
            position: "absolute",
            shadowColor: "gray",
            shadowRadius: 8,
            shadowOpacity: .3,
          },
          balanceSheetStyle,
        ]}
      >
        <TapGestureHandler
          onEnded={() => {
            xOffset.value = withSpring(-width, cfg);
          }}
        >
          <View
            style={{
              opacity: 0,
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </TapGestureHandler>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            height: height * 0.7,
            transform: [{ translateY: (height * 0.3) / 2 }],
          }}
        >
          {children}
        </View>
        <TapGestureHandler
          onEnded={() => {
            xOffset.value = withSpring(0, cfg);
          }}
        >
          <View
            style={{
              width: 30,
              height: 50,
              backgroundColor: "beige",
              transform: [{ translateX: width }, { translateY: height / 2 }],
            }}
          />
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({});

export default SideSheet;
