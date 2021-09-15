import React from "react";
import { View } from "react-native";
import { LoseMoneyCard, Player } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";

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
      <Txt>{model.title}</Txt>
      <Btn
        title={`Pay ${model.cost.toLocaleString()} ${
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
