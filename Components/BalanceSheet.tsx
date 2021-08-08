import React from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
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
import Player from "../model/Player";

const { height, width } = Dimensions.get("window");
const DRAG_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

interface BalanceSheetProps {
  forPlayer: Player;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: player }) => {
  const xOffset = useSharedValue(-width);
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
        xOffset.value = withSpring(0);
      } else if (
        velocityX < -VELOCITY_THRESHOLD ||
        translationX < -DRAG_THRESHOLD
      ) {
        xOffset.value = withSpring(-width);
      } else {
        xOffset.value = withSpring(ctx.startX);
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
            shadowOpacity: 1,
          },
          balanceSheetStyle,
        ]}
      >
        <TapGestureHandler
          onEnded={() => {
            xOffset.value = withSpring(-width);
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
          <ScrollView
            style={{
              backgroundColor: "powderblue",
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text>Name: {player.name}</Text>
            <Text>Cash: {player.cash}</Text>
            <Text>Income: {player.income}</Text>
            <Text>Assets: {player.assets}</Text>
            <Text>Expenses: {player.expenses}</Text>
          </ScrollView>
        </View>
        <TapGestureHandler
          onEnded={() => {
            xOffset.value = withSpring(0);
          }}
        >
          <View
            style={{
              width: 30,
              height: 50,
              backgroundColor: "cadetblue",
              transform: [{ translateX: width }, { translateY: height / 2 }],
            }}
          />
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({});

export default BalanceSheet;
