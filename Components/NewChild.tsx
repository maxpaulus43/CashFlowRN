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
      <Text>Downsized!</Text>
      <Button
        title="Dismiss"
        onPress={() => {
          p.addKid();
        }}
      />
    </View>
  );
};

export default NewChild;
