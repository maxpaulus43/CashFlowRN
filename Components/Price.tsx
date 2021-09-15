import React from "react";
import { StyleSheet, TextProps } from "react-native";
import Txt from "./Txt";

interface PriceProps extends TextProps {}

const Price: React.FC<PriceProps> = ({ children }) => {
  return <Txt>${children}</Txt>;
};

const styles = StyleSheet.create({});

export default Price;
