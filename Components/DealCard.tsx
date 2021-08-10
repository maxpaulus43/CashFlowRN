import React from "react";
import { View, Text, Button } from "react-native";
import DealCardModel from "../model/DealCard";
import Player from "../model/Player";

interface DealCardProps {
  model: DealCardModel;
  forPlayer: Player;
  onDismiss: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ model, forPlayer: p, onDismiss }) => {
  return (
    <View>
      <Text>DEAL</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.asset.cost}</Text>
      <Text>Cash Flow: {model.asset.cashflow}</Text>
      <Button title="Buy" onPress={() => {
          p.addAsset(model.asset);
          onDismiss();
      }} />
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default DealCard;
