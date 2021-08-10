import React from "react";
import { View, Text, Button } from "react-native";
import DealCardModel from "../model/DealCard";

interface DealCardProps {
  model: DealCardModel;
  onDismiss: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ model, onDismiss }) => {
  return (
    <View>
      <Text>DEAL</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.asset.cost}</Text>
      <Text>Cash Flow: {model.asset.cashflow}</Text>
      <Button title="Buy" onPress={onDismiss} />
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default DealCard;
