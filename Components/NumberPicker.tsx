import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, View, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { onChange } from "react-native-reanimated";

interface NumberPickerProps {
  onChangeValue: (n: number) => void | undefined;
  increment?: number;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  increment = 1000,
  onChangeValue,
}) => {
  const [value, setValue] = useState(increment);

  const decr = () => {
    const newValue = value - increment;
    if (newValue >= increment) {
      setValue(newValue);
      onChangeValue(newValue);
    }
  };
  const incr = () => {
    const newValue = value + increment;
    setValue(newValue);
    onChangeValue(newValue);
  };
  return (
    <View style={styles.container}>
      <TapGestureHandler onEnded={decr}>
        <View>
          <Text>{"<"}</Text>
        </View>
      </TapGestureHandler>

      <View>
        <Text>{value}</Text>
      </View>

      <TapGestureHandler onEnded={incr}>
        <View>
          <Text>{">"}</Text>
        </View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
})

export default NumberPicker;
