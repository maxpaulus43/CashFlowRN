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

const { height, width } = Dimensions.get("window");
const sheetWidth = width - 40;
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
          translateX: interpolate(
            xOffset.value,
            [-sheetWidth, 0],
            [sheetWidth, sheetWidth - 50]
          ),
        },
        { translateY: (height * 5) / 8 },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View
        style={[
          {
            position: "absolute",
            height,
          },
          styles.shadow,
          balanceSheetStyle,
        ]}
      >
        <TapGestureHandler onEnded={closeSheet}>
          <View
            style={{
              opacity: 0,
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </TapGestureHandler>

        <View
          style={{
            position: "absolute",
            width: sheetWidth,
            height,
            backgroundColor: sheetColor,
          }}
        >
          {children}
        </View>
        <TapGestureHandler onEnded={toggleSheet}>
          <Animated.View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                borderTopEndRadius: 50,
                borderBottomEndRadius: 50,
                width: 40,
                height: 50,
                backgroundColor: sheetColor,
                zIndex: -1,
              },
              handleStyle,
            ]}
          >
            <Text style={{ fontSize: 30 }}>📋</Text>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowRadius: 20,
    shadowOpacity: 0.5,
    shadowOffset: { width: -15, height: 0 },
  },
});

export default SideSheet;
