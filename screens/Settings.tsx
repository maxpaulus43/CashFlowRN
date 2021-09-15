import React from "react";
import { View } from "react-native";
import Txt from "../Components/Txt";

const Settings: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Txt>Instructions:</Txt>
      <Txt>Default Difficulty:</Txt>
    </View>
  );
};

export default Settings;
