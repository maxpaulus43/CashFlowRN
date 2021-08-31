import React from "react";
import { View, Text } from "react-native";
import LoseMoneyModel from "../model/LoseMoneyCard";
import Player from "../model/Player";
import Btn from "./Btn";

interface LoseMoneyProps {
  model: LoseMoneyModel;
  forPlayer: Player;
  onPayFail: () => void;
  onDismiss: () => void;
}

const LoseMoneyCard: React.FC<LoseMoneyProps> = ({
  model,
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  return (
    <View>
      <Text>{model.title}</Text>
      <Btn
        title={`Pay ${model.cost} ${
          p.cash < model.cost
            ? `(Must Borrow $${(model.cost - p.cash).toLocaleString()})`
            : ""
        }`}
        onPress={() => {
          if (p.cash < model.cost) {
            onPayFail();
          } else {
            p.takeCash(model.cost);
            onDismiss();
          }
        }}
      />
    </View>
  );
};

export default LoseMoneyCard;
