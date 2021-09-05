import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "../model";

const Home: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  // const [savedGameString, setSavedGameString] = useState<string>();
  // let savedGame: Game | undefined;
  // let player: Player | undefined;
  // if (savedGameString) {
  //   savedGame = Game.fromSaveData(JSON.parse(savedGameString));
  //   player = savedGame?.players[0];
  // }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("@CashFlowRNSavedGame");
  //       if (jsonValue != null) {
  //         setSavedGameString(jsonValue);
  //       }
  //     } catch (e: any) {
  //       console.error(e.toString());
  //     }
  //   })();
  // });

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

      <Button
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
