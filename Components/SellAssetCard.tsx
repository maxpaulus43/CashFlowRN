import React from "react";
import { View, Text, Button } from "react-native";
import SellAssetModel from "../model/SellAssetCard";

interface SellAssetProps {
  model: SellAssetModel;
  onDismiss: () => void;
}

const SellAssetCard: React.FC<SellAssetProps> = ({ model, onDismiss }) => {
  return (
    <View>
      <Text>ASSET</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Info: {model.assetInfo}</Text>
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default SellAssetCard;
