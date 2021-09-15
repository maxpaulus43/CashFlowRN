import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface TxtProps extends TextProps {}

const Txt: React.FC<TxtProps> = ({ children, style }) => {
  return <Text style={[{ fontFamily: "Cochin" }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({});

export default Txt;
