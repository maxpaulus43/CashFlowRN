import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import LoseMoneyModel from "../model/LoseMoneyCard";
import Player from "../model/Player";

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
  const [didFailToPay, setDidFailToPay] = useState(false);
  return (
    <View>
      {didFailToPay && <Text>You Must Borrow Money to pay</Text>}
      <Text>LOSE MONEY</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.cost}</Text>
      <Button
        title="Pay"
        onPress={() => {
          if (p.cash < model.cost) {
            setDidFailToPay(true);
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
