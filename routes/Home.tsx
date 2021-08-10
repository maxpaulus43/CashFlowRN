import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "react-native";

const Home: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="New Game"
        onPress={() => navigation.navigate("New Game")}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
