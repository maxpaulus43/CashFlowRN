import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Property } from "../model/Asset";
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
  const sellablePlayerAssets: Property[] = p.properties;
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    sellablePlayerAssets[0]?.id
  );
  const canSellAssets = sellablePlayerAssets.length > 0;

  return (
    <View>
      <Text>SELL ASSET</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>

      {canSellAssets ? (
        <View>
          <Text>Select Asset to sell:</Text>
          <Picker
            selectedValue={selectedPropertyId}
            onValueChange={setSelectedPropertyId}
            itemStyle={{ height: 100 }}
          >
            {sellablePlayerAssets.map((p) => (
              <Picker.Item label={p.id} value={p.id} />
            ))}
          </Picker>
          <Button
            disabled={!selectedPropertyId}
            title="Sell"
            onPress={() => {
              p.sellPropertyForAmount(selectedPropertyId!, model.offerAmount);
              onDismiss();
            }}
          />
        </View>
      ) : (
        <View>
          <Text>No Assets of this kind</Text>
        </View>
      )}
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default SellAssetCard;
