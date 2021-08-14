import React from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";

interface props {
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const Downsize: React.FC<props> = ({ forPlayer: p, onPayFail, onDismiss }) => {
  return (
    <View>
      <Text>Downsized!</Text>
      <Button
        title="Pay"
        onPress={() => {
          // todo skip 2 turns
          if (p.cash < p.expenses()) {
            onPayFail(p.expenses() - p.cash);
          } else {
            p.takeCash(p.expenses());
            onDismiss();
          }
        }}
      />
    </View>
  );
};

export default Downsize;
