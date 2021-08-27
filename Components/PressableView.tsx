import React from "react";
import { StyleSheet, ViewProps, TouchableOpacity } from "react-native";

interface PressableViewProps extends ViewProps {
  onPress: () => void;
}

const PressableView: React.FC<PressableViewProps> = ({
  onPress,
  children,
  ...other
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...other}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default PressableView;
