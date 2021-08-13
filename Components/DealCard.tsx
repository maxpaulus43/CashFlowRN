import React, { useRef, useState } from "react";
import { View, Text, Button } from "react-native";
import { Property, Stock } from "../model/Asset";
import DealCardModel from "../model/DealCard";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";

enum DealType {
  Stock,
  Property,
}
interface DealCardProps {
  model: DealCardModel;
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealCard: React.FC<DealCardProps> = ({
  model,
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  const isStockDeal = model.asset instanceof Stock;
  const [amount, setAmount] = useState(1);
  const totalAssetCost = model.asset.cost * amount;

  let buttonTitle = "Buy";
  const playerCantAffordIt = p.cash < totalAssetCost;
  if (playerCantAffordIt) {
    buttonTitle += `(Must Borrow $${totalAssetCost - p.cash})`;
  }

  const buyStock = () => {
    if (playerCantAffordIt) {
      onPayFail(totalAssetCost - p.cash);
      return;
    }
    p.buyStockAmount(model.asset as Stock, amount);
    onDismiss();
  };

  const buyProperty = () => {
    if (playerCantAffordIt) {
      onPayFail(totalAssetCost - p.cash);
      return;
    }
    p.buyProperty(model.asset as Property);
    onDismiss();
  };

  return (
    <View>
      <Text>{isStockDeal ? "STOCK" : "PROPERTY"} DEAL</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {model.asset.cost}</Text>
      <Text>Cash Flow: {model.asset.cashflow}</Text>

      {isStockDeal ? (
        <View>
          <Text>How Many Stocks?</Text>
          <NumberPicker increment={1} onChangeValue={setAmount} />
          <Button title={buttonTitle} onPress={buyStock} />
        </View>
      ) : (
        <View>
          <Button title={buttonTitle} onPress={buyProperty} />
        </View>
      )}

      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default DealCard;
