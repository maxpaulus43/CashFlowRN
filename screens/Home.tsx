import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game, Player } from "../model";

const Home: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  const [savedGameString, setSavedGameString] = useState<string>();
  let savedGame: Game | undefined;
  let player: Player | undefined;
  console.log("rendered");
  if (savedGameString) {
    savedGame = Game.fromSaveData(JSON.parse(savedGameString));
    player = savedGame?.players[0];
  }

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@CashFlowRNSavedGame");
        if (jsonValue != null) {
          setSavedGameString(jsonValue);
        }
      } catch (e: any) {
        console.error(e.toString());
      }
    })();
  });

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
      {savedGame && (
        <Button
          title="Resume Game"
          onPress={() => {
            navigation.navigate("Game", { player, game: savedGame });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  blah: {
    backgroundColor: "powderblue",
  },
});

export default Home;
