import React, { useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { Board } from "../model";
import BoardSvg from "./BoardSvg";

const { width, height } = Dimensions.get("window");
const diameter = width - 50;
const pieceDiameter = 20;

export const PIECE_MOVE_ANIMATION_DURATION = 400;

interface BoardViewProps {
  model: Board;
  renderCenterContent?: () => React.ReactNode;
}

const BoardView: React.FC<BoardViewProps> = ({
  model,
  renderCenterContent,
}) => {
  const pos = model.getPositionForPlayer(model.getPlayerIds()[0]);
  let x = useSharedValue(diameter / 2);
  let y = useSharedValue(diameter / 2);

  useEffect(() => {
    let { x: newX, y: newY } = getPlayerCoordinatesForPosition(pos);
    newX -= pieceDiameter / 2;
    newY -= pieceDiameter / 2;
    x.value = withTiming(newX, { duration: PIECE_MOVE_ANIMATION_DURATION });
    y.value = withTiming(newY, { duration: PIECE_MOVE_ANIMATION_DURATION });
  }, [pos]);

  const s = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <View
      style={{
        width: diameter,
        height: diameter,
      }}
    >
      <View style={StyleSheet.absoluteFill}>
        <BoardSvg width={diameter} height={diameter} />
      </View>

      {typeof renderCenterContent === "function" && (
        <View style={StyleSheet.absoluteFill}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {renderCenterContent()}
          </View>
        </View>
      )}
      {/* {model.spaces.map((space, idx) => {
        let { x, y } = getPlayerCoordinatesForPosition(idx);
        return (
          <View
            style={{
              position: "absolute",
              transform: [{ translateX: x - 18 }, { translateY: y - 4 }, {rotate: `${idx * (360 / 24)}deg`}],
            }}
          >
            <Text style={{color: "white"}}>{space}</Text>
          </View>
        );
      })} */}
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
  const rotationalOffset = Math.PI / 24;
  const radialOffset = -30;

  const polarPoint = {
    theta: -position * ((Math.PI * 2) / 24) + rotationalOffset,
    radius: diameter / 2 + radialOffset,
  };

  const coords = polar2Canvas(polarPoint, center);
  return coords;
}

export default BoardView;

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
