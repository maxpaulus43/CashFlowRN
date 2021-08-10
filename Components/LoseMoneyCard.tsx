import React from "react";
import { View, Text, Button } from "react-native";
import LoseMoneyModel from "../model/LoseMoneyCard";

interface LoseMoneyProps {
  model: LoseMoneyModel;
  onDismiss: () => void;
}

const LoseMoneyCard: React.FC<LoseMoneyProps> = ({ model, onDismiss }) => {
  return (
    <View>
      <Text>LOSE MONEY</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.cost}</Text>
      <Button title="Pay" onPress={onDismiss} />
    </View>
  );
};

export default LoseMoneyCard;
