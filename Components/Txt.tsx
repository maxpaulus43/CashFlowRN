import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
  Platform,
} from "react-native";

interface TxtProps extends TextProps {
  center?: boolean;
  bold?: boolean;
}

const Txt: React.FC<TxtProps> = ({ children, style, center, bold }) => {
  const fontFamily = Platform.select({ ios: "Cochin", android: "serif" });
  const styles: StyleProp<TextStyle>[] = [{ fontFamily, fontSize: 20 }];
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
