import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Asset from "../model/Asset";
import Player from "../model/Player";
import SellAssetModel from "../model/SellAssetCard";

interface SellAssetProps {
  model: SellAssetModel;
  forPlayer: Player;
  onDismiss: () => void;
}

const SellAssetCard: React.FC<SellAssetProps> = ({
  model,
  forPlayer: p,
  onDismiss,
}) => {
  const sellablePlayerAssets = p.assets.filter((a) => {
    return a.type === model.asset.type;
  });
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const canSellAssets = sellablePlayerAssets.length > 0;
  return (
    <View>
      <Text>SELL ASSET</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Type: {model.asset.type}</Text>

      {canSellAssets ? (
        <View>
          <Text>Select Asset to sell:</Text>
          {sellablePlayerAssets.map((a) => (
            <Text>{a.type}</Text>
          ))}
          <Button
            title="Sell"
            onPress={() => {
              for (let a of selectedAssets) {
                p.removeAsset(a);
              }
              onDismiss();
            }}
          />
        </View>
      ) : (
        <View><Text>No Assets of this kind</Text></View>
      )}
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default SellAssetCard;
