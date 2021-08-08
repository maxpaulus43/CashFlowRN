import React, { useEffect } from "react";
import { Button, Dimensions, ViewProps, StyleSheet } from "react-native";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const { height, width } = Dimensions.get("window");

interface CardModalProps extends ViewProps {
  isVisible: boolean;
}

const CardModal: React.FC<CardModalProps> = ({ isVisible, children }) => {
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
      <View
        style={{
          height: 280,
          width: width * 0.8,
          backgroundColor: "lightgreen",
          shadowColor: "gray",
          shadowOpacity: 1,
          shadowRadius: 8,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default CardModal;
