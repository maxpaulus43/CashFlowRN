import React from "react";
import { StyleSheet, Text, ViewProps } from "react-native";

interface PriceProps extends ViewProps {}

const Price: React.FC<PriceProps> = ({ children }) => {
  return <Text>${children}</Text>;
};

const styles = StyleSheet.create({});

export default Price;
