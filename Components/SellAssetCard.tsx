import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Property } from "../model/Asset";
import Player from "../model/Player";
import SellAssetModel from "../model/SellAssetCard";
import Btn from "./Btn";

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
  const sellablePlayerAssets: Property[] = p.properties.filter(
    (p) => model.propertyType === p.propertyType
  );
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
              <Picker.Item label={p.id} value={p.id} key={p.id} />
            ))}
          </Picker>
          <Btn
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
      <Btn title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default SellAssetCard;
