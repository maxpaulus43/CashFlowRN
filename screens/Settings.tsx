import React from "react";
import { View, Text } from "react-native";

const Settings: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Instructions:</Text>
      <Text>Default Difficulty:</Text>
    </View>
  );
};

export default Settings;
