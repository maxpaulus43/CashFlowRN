import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View} from "react-native";
import { Improvement, MarketCard, Offer, Player, Property } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";

interface MarketCardViewProps {
  model: MarketCard;
  forPlayer: Player;
  onDismiss: () => void;
}

const MarketCardView2: React.FC<MarketCardViewProps> = (props) => {
  switch (props.model.type) {
    case "Improvement": {
      return <AssetImprovedView {...props} />;
    }
    default: {
      return <MarketCardView {...props} />;
    }
  }
};

const AssetImprovedView: React.FC<MarketCardViewProps> = ({
  onDismiss,
  model,
  forPlayer: p,
}) => {
  const onPress = () => {
    const improvement = model.info as Improvement;
    p.improveProperty(improvement.id, improvement.incomeIncrease);
    onDismiss();
  };

  return (
    <View>
      <Txt>{model.title}</Txt>
      <Txt>{model.text}</Txt>
      <Btn title="Dismiss" onPress={onPress} />
    </View>
  );
};

const MarketCardView: React.FC<MarketCardViewProps> = ({
  model,
  forPlayer: p,
  onDismiss,
}) => {
  const offer = model.info as Offer;
  const [amountSoldSoFar, setAmountSoldSoFar] = useState(0);
  const sellablePlayerAssets: Property[] =
    model.type === "AllPlex"
      ? p.properties.filter(
          (p) =>
            p.type === "Duplex" ||
            p.type === "FourPlex" ||
            p.type === "EightPlex"
        )
      : p.properties.filter((p) => model.type === p.type);

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    sellablePlayerAssets[0]?.id
  );
  const playerHasSellableAssets = sellablePlayerAssets.length > 0;

  return (
    <View>
      <Txt>Market</Txt>
      <Txt>{model.title}</Txt>
      <Txt>{model.text}</Txt>

      {playerHasSellableAssets ? (
        <View>
          <Txt>Select Asset to sell:</Txt>
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

              let newAmountSoldSoFar = amountSoldSoFar + 1;
              let saleLimit = offer.limit ?? Number.MAX_SAFE_INTEGER;
              if (newAmountSoldSoFar >= saleLimit) {
                onDismiss();
              } else {
                setAmountSoldSoFar(newAmountSoldSoFar);
              }
            }}
          />
        </View>
      ) : (
        <View>
          <Txt>No Assets of this kind</Txt>
        </View>
      )}
      <Btn title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default MarketCardView2;
