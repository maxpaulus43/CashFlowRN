import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "../model";
import Btn from "../Components/Btn";

const Home: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Btn title="New Game" onPress={() => navigation.navigate("New Game")} />
      <Btn title="Settings" onPress={() => navigation.navigate("Settings")} />

      <Btn
        title="Resume Game"
        onPress={() => {
          AsyncStorage.getItem("@CashFlowRNSavedGame")
            .then((jsonValue) => {
              if (jsonValue) {
                return Game.fromSaveData(JSON.parse(jsonValue));
              }
            })
            .then((game) => {
              if (game) {
                const player = game.players[0];
                navigation.navigate("Game", { player, game });
              } else {
                Alert.alert(
                  "There are no saved Games. Start a new game instead!"
                );
              }
            });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blah: {
    backgroundColor: "powderblue",
  },
});

export default Home;
