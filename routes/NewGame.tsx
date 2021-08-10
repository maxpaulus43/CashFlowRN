import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { View, Button, ActionSheetIOS, Text, TextInput } from "react-native";
import Game from "../model/Game";
import Player from "../model/Player";

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

  const presentDifficultyOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      { options: [...difficultyOptions, "Cancel"], cancelButtonIndex: 5 },
      (buttonIdx) => {
        if (buttonIdx === 5) return;
        setDifficulty(buttonIdx); // buttonIdx matches exactly with the difficulty enum
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your Name:</Text>
      <TextInput
        placeholder="enter a name"
        onChange={({ nativeEvent: { text } }) => {
          name.current = text;
        }}
      >
        {name.current}
      </TextInput>
      <Button title="Choose Difficulty" onPress={presentDifficultyOptions} />
      <Text>Difficulty: {difficultyOptions[difficulty]}</Text>
      <Button
        title="Start"
        onPress={() => {
          const player = makePlayerForDifficulty(
            difficulty,
            name.current ?? "Jane Doe"
          );
          const game = new Game([player]);
          navigation.navigate("Game", { player, game });
        }}
      />
    </View>
  );
};

const makePlayerForDifficulty = (
  difficulty: Difficulty,
  name: string
): Player => {
  switch (difficulty) {
    case Difficulty.XEASY: {
      return new Player(name, 850, 12500, 1200, 140, "Lawyer");
    }
    case Difficulty.EASY: {
      return new Player(name, 750, 8000, 1000, 120, "Engineer");
    }
    case Difficulty.MEDIUM: {
      return new Player(name, 650, 6300, 750, 110, "Teacher");
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
