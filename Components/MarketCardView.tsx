import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { MarketCard, Offer, Player, Property } from "../model";
import Btn from "./Btn";

interface MarketCardViewProps {
  model: MarketCard;
  forPlayer: Player;
  onDismiss: () => void;
}

const MarketCardView: React.FC<MarketCardViewProps> = ({
  model,
  forPlayer: p,
  onDismiss,
}) => {
  const sellablePlayerAssets: Property[] = p.properties.filter(
    (p) => model.type === p.type
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
              p.sellPropertyForAmount(
                selectedPropertyId!,
                (model.info as Offer).offerAmount
              );
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

export default MarketCardView;
