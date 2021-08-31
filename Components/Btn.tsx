import React from "react";
import { TextStyle } from "react-native";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import PressableView from "./PressableView";

interface BtnProps {
  onPress: () => void;
  disabled?: boolean;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Btn: React.FC<BtnProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const pressHandler = disabled ? () => {} : onPress;
  const s = disabled ? styles.disabled : styles.btn;
  const defaultTextStyle = disabled ? styles.disabledText : styles.btnText;
  return (
    <PressableView onPress={pressHandler} style={[s, style]}>
      <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
    </PressableView>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: "#8C8593",
    padding: 15,
    borderRadius: 100,
    margin: 5,
  },
  btn: {
    backgroundColor: "#733B80",
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    margin: 5,
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  disabledText: {
    textAlign: "center",
    fontSize: 20,
    color: "#DDDDDD",
  },
});

export default Btn;
