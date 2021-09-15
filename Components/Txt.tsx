import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
} from "react-native";

interface TxtProps extends TextProps {
  center?: boolean;
  bold?: boolean;
}

const Txt: React.FC<TxtProps> = ({ children, style, center, bold }) => {
  const styles: StyleProp<TextStyle>[] = [{ fontFamily: "Cochin", fontSize: 18 }];
  if (center) {
    styles.push({ textAlign: "center" });
  }
  if (bold) {
    styles.push({ fontWeight: "bold" });
  }
  styles.push(style);
  return <Text style={styles}>{children}</Text>;
};

const styles = StyleSheet.create({});

export default Txt;
