import React from "react";
import { View, Text } from "react-native";
import { LoseMoneyCard, Player } from "../model";
import Btn from "./Btn";

interface LoseMoneyViewProps {
  model: LoseMoneyCard;
  forPlayer: Player;
  onPayFail: () => void;
  onDismiss: () => void;
}

const LoseMoneyCardView: React.FC<LoseMoneyViewProps> = ({
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

export default LoseMoneyCardView;
