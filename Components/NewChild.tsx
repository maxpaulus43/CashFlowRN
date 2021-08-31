import React from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";

interface props {
  forPlayer: Player;
  onDismiss: () => void;
}

const NewChild: React.FC<props> = ({ forPlayer: p, onDismiss }) => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>
        Congrats! You had a new Child! Your expenses have increased by{" "}
        {p.expensesPerKid.toLocaleString()}
      </Text>
      <Button
        title="Dismiss"
        onPress={() => {
          p.addKid();
          onDismiss();
        }}
      />
    </View>
  );
};

export default NewChild;
