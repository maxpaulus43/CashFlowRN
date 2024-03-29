import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";
import Game from "../model/Game";
import Liability from "../model/Liability";
import Player from "../model/Player";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Btn from "../Components/Btn";
import Txt from "../Components/Txt";

enum Difficulty {
  XEASY = 0,
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  XHARD = 4,
}

const difficultyOptions = [
  "Lawyer (Extra Easy)",
  "Engineer (Easy)",
  "Teacher (Medium)",
  "Cashier (Hard)",
  "Nomad (Extra Hard)",
];

const NewGame: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const name = useRef("Jane Doe");
  const { showActionSheetWithOptions } = useActionSheet();

  const presentDifficultyOptions = () => {
    showActionSheetWithOptions(
      { options: [...difficultyOptions, "Cancel"], cancelButtonIndex: 5 },
      (buttonIdx) => {
        if (buttonIdx === 5) return;
        setDifficulty(buttonIdx); // buttonIdx matches exactly with the difficulty enum
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Txt>Your Name:</Txt>
      <TextInput
        style={{
          borderColor: "gray",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
        placeholder="enter a name"
        onChange={({ nativeEvent: { text } }) => {
          name.current = text;
        }}
        value={name.current}
      ></TextInput>
      <Btn title="Choose Difficulty" onPress={presentDifficultyOptions} />
      <Txt>Difficulty: {difficultyOptions[difficulty]}</Txt>
      <Btn
        title="Start"
        onPress={() => {
          const player = makePlayerForDifficulty(
            difficulty,
            name.current ?? "Jane Doe"
          );
          const game = new Game([player]);
          navigation.navigate("Game", { game: game.saveData() });
        }}
      />
    </View>
  );
};

const makePlayerForDifficulty = (
  difficulty: Difficulty,
  name: string
): Player => {
  // todo random difficulty
  switch (difficulty) {
    case Difficulty.XEASY: {
      return new Player(name, 850, 12500, 1200, 140, "Lawyer");
    }
    case Difficulty.EASY: {
      return new Player(name, 750, 8000, 1000, 120, "Engineer");
    }
    case Difficulty.MEDIUM: {
      const p = new Player(name, 650, 4000, 750, 110, "Teacher");
      p.addLiabiliy(
        new Liability("Home Mortgage", 75000, "Mortgage Payment", 0.03)
      );
      return p;
    }
    case Difficulty.HARD: {
      return new Player(name, 600, 3000, 500, 90, "Janitor");
    }
    case Difficulty.XHARD: {
      return new Player(name, 250, 1000, 200, 60, "Nomad");
    }
  }
};

export default NewGame;
