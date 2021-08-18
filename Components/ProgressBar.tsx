import React from "react";
import { useRef } from "react";
import { LayoutAnimation, LayoutChangeEvent, StyleSheet } from "react-native";
import { View, Text } from "react-native";

const DEFAULT_HEIGHT = 20;

interface props {
  progress: number; // between 0 and 1
  progressLabel: string;
}

const ProgressBar: React.FC<props> = ({ progress, progressLabel }) => {
  const barWidth = useRef(0);
  const labelWidth = useRef(0);

  const setBarWidth = (e: LayoutChangeEvent) => {
    barWidth.current = e.nativeEvent.layout.width;
  };

  const setLabelWidth = (e: LayoutChangeEvent) => {
    labelWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View>
      <View style={styles.bar} onLayout={setBarWidth}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
      <View
        style={{ transform: [{ translateX: progress * barWidth.current - 5 }] }}
      >
        <Text style={{ fontSize: 15 }}>↑</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          transform: [
            {
              translateX: clamp(
                progress * barWidth.current - labelWidth.current / 2,
                [0, barWidth.current - labelWidth.current]
              ),
            },
          ],
        }}
      >
        <Text onLayout={setLabelWidth}>{progressLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: DEFAULT_HEIGHT,
    backgroundColor: "lightgray",
  },
  progress: {
    height: DEFAULT_HEIGHT,
    backgroundColor: "limegreen",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 4,
  }
});

function clamp(inputValue: number, outputRange: [low: number, high: number]) {
  return Math.min(outputRange[1], Math.max(inputValue, outputRange[0]));
}

export default ProgressBar;
