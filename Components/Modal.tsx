import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";
const { height, width } = Dimensions.get("screen");

interface props {
  isVisible: boolean;
}

const Modal: React.FC<props> = ({ isVisible, children }) => {
  const yOffset = useSharedValue(height);

  useEffect(() => {
    yOffset.value = withSpring(isVisible ? 0 : height, {
      stiffness: 50,
      mass: 0.5,
      damping: 10,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });
  }, [isVisible]);

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yOffset.value }],
    };
  });

  const underlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(yOffset.value, [height / 11, 0], [0, 0.3]),
      height: interpolate(
        yOffset.value,
        [height / 11, 0],
        [height, height + height / 11]
      ),
      transform: [
        {
          translateY: interpolate(
            yOffset.value,
            [height / 2, 0],
            [0, -height / 11]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        },
        modalStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
          },
          underlayStyle,
        ]}
      />
      <View>
        <View
          style={[
            styles.card,
            StyleSheet.absoluteFill,
            { transform: [{ rotateZ: "-6deg" }] },
          ]}
        />
        <View
          style={[
            styles.card,
            StyleSheet.absoluteFill,
            { transform: [{ rotateZ: "-3deg" }] },
          ]}
        />
        <View style={[styles.card, styles.shadow]}>{children}</View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: height * 0.5,
    width: width * 0.8,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    padding: 25,
    borderColor: "#533A1A",
  },
  shadow: {
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 20 },
  },
});

export default Modal;
