import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { AssetType, Property, Stock } from "../model/Asset";
import DealCardModel from "../model/DealCard";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";
interface DealCardProps {
  model: DealCardModel;
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealCard: React.FC<DealCardProps> = (props) => {
  switch (props.model.asset.type) {
    case AssetType.Stock: {
      return <BuyStockView {...props} />;
    }
    case AssetType.Company:
    case AssetType.Property: {
      return <BuyPropertyView {...props} />;
    }
  }
};

const BuyStockView: React.FC<DealCardProps> = ({
  model,
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  const [amount, setAmount] = useState(1);
  const stock = model.asset as Stock;
  const totalAssetCost = stock.cost * amount;
  const playersExistingStocks = p.getStocksForId(stock.id);
  const playerCanSell = playersExistingStocks.length > 0;

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
    p.buyStockAmount(stock, amount);
    onDismiss();
  };

  const sellStock = () => {
    p.sellStockAmount(stock, amount);
  };

  return (
    <View>
      <Text>STOCK DEAL</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {stock.cost}</Text>
      <Text>Cash Flow: {stock.cashFlow}</Text>
      <Text>How Many Stocks?</Text>
      <NumberPicker increment={1} onChangeValue={setAmount} />
      <Button title={buttonTitle} onPress={buyStock} />
      {playerCanSell && <Button title="Sell" onPress={sellStock} />}
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

const BuyPropertyView: React.FC<DealCardProps> = ({
  model,
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  let buttonTitle = "Buy";
  const property = model.asset as Property;
  const playerCantAffordIt = p.cash < property.downPayment;
  if (playerCantAffordIt) {
    buttonTitle += `(Must Borrow $${property.downPayment - p.cash})`;
  }

  const buyProperty = () => {
    if (playerCantAffordIt) {
      onPayFail(property.downPayment - p.cash);
      return;
    }
    p.buyProperty(property);
    onDismiss();
  };

  return (
    <View>
      <Text>PROPERTY DEAL</Text>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>Cost: {property.cost}</Text>
      <Text>Cash Flow: {property.cashFlow}</Text>
      <Text>Down Payment:{property.downPayment}</Text>
      <Button title={buttonTitle} onPress={buyProperty} />
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default DealCard;
