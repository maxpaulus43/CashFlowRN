import React, { useEffect, useRef } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";
import BoardModel from "../model/Board";
import BoardSvg from "./BoardSvg";

const { width, height } = Dimensions.get("window");
const diameter = width - 50;
const pieceDiameter = 20;

const timingCfg = {

}

interface BoardProps {
  model: BoardModel;
}

const Board: React.FC<BoardProps> = ({ model }) => {
  const pos = model.getPositionForPlayer(model.getPlayerIds()[0]);
  let x = useSharedValue(0);
  let y = useSharedValue(0);

  useEffect(() => {
    let { x: a, y: b } = getPlayerCoordinatesForPosition(pos);
    a -= pieceDiameter / 2;
    b -= pieceDiameter / 2;
    x.value = withTiming(a, {duration: 500});
    y.value = withTiming(b, {duration: 500});
  }, [pos]);

  const s = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <View style={{ width: diameter, height: diameter }}>
      <Text>Pos: {pos}</Text>
      <View style={StyleSheet.absoluteFill}>
        <BoardSvg width={diameter} height={diameter} />
      </View>
      <Animated.View
        style={[
          {
            width: pieceDiameter,
            height: pieceDiameter,
            position: "absolute",
            backgroundColor: "black",
            borderRadius: pieceDiameter / 2,
          },
          s,
        ]}
      />
    </View>
  );
};

function getPlayerCoordinatesForPosition(position: number): {
  x: number;
  y: number;
} {
  const center = { x: diameter / 2, y: diameter / 2 };
  const polarPoint = {
    theta: -position * ((Math.PI * 2) / 24) + Math.PI / 25,
    radius: diameter / 2 - 30,
  };

  const coords = polar2Canvas(polarPoint, center);
  return coords;
}

export default Board;

interface Vector {
  x: number;
  y: number;
}

interface PolarPoint {
  theta: number;
  radius: number;
}

const cartesian2Canvas = (v: Vector, center: Vector) => {
  return {
    x: v.x + center.x,
    y: -1 * v.y + center.y,
  };
};

const polar2Cartesian = (p: PolarPoint) => {
  return {
    x: p.radius * Math.cos(p.theta),
    y: p.radius * Math.sin(p.theta),
  };
};

const polar2Canvas = (p: PolarPoint, center: Vector) => {
  return cartesian2Canvas(polar2Cartesian(p), center);
};
