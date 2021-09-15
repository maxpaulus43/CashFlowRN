import React from "react";
import { StyleSheet, TextProps } from "react-native";
import Txt from "./Txt";

interface PriceProps {
  value: number
}

const Price: React.FC<PriceProps> = ({ value }) => {
  return <Txt>${value.toLocaleString()}</Txt>;
};

const styles = StyleSheet.create({});

export default Price;
