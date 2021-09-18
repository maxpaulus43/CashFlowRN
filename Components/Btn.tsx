import React from "react";
import { TextStyle } from "react-native";
import { StyleSheet, ViewStyle } from "react-native";
import PressableView from "./PressableView";
import Txt from "./Txt";

interface BtnProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
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
      <Txt style={[defaultTextStyle, textStyle]}>{title}</Txt>
    </PressableView>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: "#8C8593",
    padding: 15,
    borderRadius: 100,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#733B80",
    padding: 15,
    borderRadius: 100,
    margin: 5,
  },
  btnText: {
    color: "white",
  },
  disabledText: {
    color: "#DDDDDD",
  },
});

export default Btn;
