import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
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
import { interpolate } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
const sheetWidth = width - 50;
const DRAG_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;
const sheetColor = "beige";
const cfg = {
  stiffness: 0.2,
  mass: 0.001,
  damping: 10000,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const SideSheet: React.FC = ({ children }) => {
  const xOffset = useSharedValue(-sheetWidth);
  const closeSheet = () => {
    "worklet";
    xOffset.value = withSpring(-sheetWidth, cfg);
  };
  const openSheet = () => {
    "worklet";
    xOffset.value = withSpring(0, cfg);
  };
  const toggleSheet = () => {
    "worklet";
    if (xOffset.value === 0) {
      closeSheet();
    } else {
      openSheet();
    }
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
        openSheet();
      } else if (
        velocityX < -VELOCITY_THRESHOLD ||
        translationX < -DRAG_THRESHOLD
      ) {
        closeSheet();
      } else {
        xOffset.value = withSpring(ctx.startX, cfg);
      }
    },
  });

  const balanceSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: Math.min(xOffset.value, 0) }],
      width: interpolate(
        xOffset.value,
        [-sheetWidth, 0],
        [sheetWidth + 10, width]
      ),
    };
  });

  const handleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(xOffset.value, [-sheetWidth, 0], [1, 0]),
      transform: [
        {
          translateX: interpolate(xOffset.value, [-sheetWidth, 0], [0, -50]),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View style={[styles.rootStyle, balanceSheetStyle]}>
        <TapGestureHandler onEnded={closeSheet}>
          <View style={styles.underlay} />
        </TapGestureHandler>

        <View style={styles.childContainer}>
          <TapGestureHandler onEnded={toggleSheet}>
            <Animated.View style={[styles.handle, handleStyle]}>
              <Text style={{ fontSize: 30 }}>📋</Text>
            </Animated.View>
          </TapGestureHandler>
          {children}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    position: "absolute",
    height: height,
    shadowColor: "black",
    shadowRadius: 20,
    shadowOpacity: 0.5,
    shadowOffset: { width: -15, height: 0 },
  },
  childContainer: {
    width: sheetWidth,
    height,
    zIndex: 1,
    backgroundColor: sheetColor,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
  },
  handle: {
    position: "absolute",
    width: 50,
    height: 50,
    right: -50,
    backgroundColor: sheetColor,
    top: (height * 5) / 8,
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "peru",
    zIndex: -1,
  },
});

export default SideSheet;
