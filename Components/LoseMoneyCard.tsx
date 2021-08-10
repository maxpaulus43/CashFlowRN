import React from "react";
import { View, Text, Button } from "react-native";
import LoseMoneyModel from "../model/LoseMoneyCard";

interface LoseMoneyProps {
  model: LoseMoneyModel;
  onPayAttempt: () => void;
}

const LoseMoneyCard: React.FC<LoseMoneyProps> = ({ model, onPayAttempt }) => {
  return (
    <View>
      <Text>LOSE MONEY</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.cost}</Text>
      <Button title="Pay" onPress={onPayAttempt} />
    </View>
  );
};

export default LoseMoneyCard;
