import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PressableView from "./PressableView";

interface BtnProps {
  onPress: () => void;
  disabled?: boolean;
  title: string;
}

const Btn: React.FC<BtnProps> = ({ title, onPress, disabled = false }) => {
  const pressHandler = disabled ? () => {} : onPress;
  const s = disabled ? styles.disabled : styles.btn;
  return (
    <PressableView onPress={pressHandler} style={s}>
      <Text style={styles.btnText}>{title}</Text>
    </PressableView>
  );
};

const styles = StyleSheet.create({
  disabled: {},
  btn: {
    backgroundColor: "rebeccapurple",
    padding: 15,
    borderRadius: 100,
    margin: 5,
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
});

export default Btn;
