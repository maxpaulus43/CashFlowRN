import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AssetType, Property, Stock } from "../model/Asset";
import DealCard from "../model/DealCard";
import Player from "../model/Player";
import Btn from "./Btn";
import NumberPicker from "./NumberPicker";

interface DealCardViewProps {
  model: DealCard;
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealCardView: React.FC<DealCardViewProps> = (props) => {
  switch (props.model.asset.type) {
    case AssetType.Stock: {
      return <BuyStockView {...props} />;
    }
    case AssetType.Company: {
      return <BuyCompanyView {...props} />;
    }
    case AssetType.Property: {
      return <BuyPropertyView {...props} />;
    }
  }
};

const BuyCompanyView: React.FC<DealCardViewProps> = ({ onDismiss }) => {
  return (
    <View>
      <Text>I want to buy your Company!!</Text>
      <Btn title="Cancel" onPress={onDismiss} style={styles.userActionButton} />
    </View>
  );
};

const BuyStockView: React.FC<DealCardViewProps> = ({
  model,
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  const [amount, setAmount] = useState(1);
  const stock = model.asset as Stock;
  const totalAssetCost = stock.cost * amount;
  const [_, playersExistingStockCount] = p.getStocksForId(stock.id);
  const playerCanSell = playersExistingStockCount > 0;

  let buttonTitle = "Buy";
  const playerCantAffordIt = p.cash < totalAssetCost;
  if (playerCantAffordIt) {
    let amt = Math.ceil((totalAssetCost - p.cash) / 1000) * 1000;
    buttonTitle += `(Must Borrow $${amt})`;
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
    setAmount(1);
  };

  return (
    <View style={styles.card}>
      <View>
        <Text>STOCK DEAL</Text>
        <Text>{model.title}</Text>
        <Text>{model.text}</Text>
        <Text>Cost: {stock.cost}</Text>
        <Text>Cash Flow: {stock.cashFlow}</Text>
        <Text>How Many Stocks?</Text>
        <NumberPicker increment={1} onChangeValue={setAmount} />
      </View>
      <View>
        <Btn
          title={buttonTitle}
          onPress={buyStock}
          style={styles.userActionButton}
        />
        {playerCanSell && (
          <Btn
            title="Sell"
            disabled={playersExistingStockCount < amount}
            onPress={() => {
              sellStock();
              onDismiss();
            }}
            style={styles.userActionButton}
          />
        )}
        <Btn
          title="Cancel"
          onPress={onDismiss}
          style={styles.userActionButton}
        />
      </View>
    </View>
  );
};

const BuyPropertyView: React.FC<DealCardViewProps> = ({
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
    <View style={styles.card}>
      <View style={{ alignItems: "center" }}>
        <View>
          <Text>PROPERTY DEAL</Text>
          <Text>{model.title}</Text>
        </View>

        <View>
          <Text>{model.text}</Text>
        </View>

        <View>
          <Text>Cost: {property.cost}</Text>
          <Text>Cash Flow: {property.cashFlow}</Text>
          <Text>Down Payment:{property.downPayment}</Text>
        </View>
      </View>

      <View style={{ maxWidth: "80%" }}>
        <Btn
          title={buttonTitle}
          onPress={buyProperty}
          style={styles.userActionButton}
        />
        <Btn
          title="Cancel"
          onPress={onDismiss}
          style={styles.userActionButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userActionButton: {
    backgroundColor: "#07beb8",
  },
});

export default DealCardView;
