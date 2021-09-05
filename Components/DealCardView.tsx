import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DealCard, Property, Stock, Player, StockSplit } from "../model";
import Btn from "./Btn";
import NumberPicker from "./NumberPicker";

interface DealCardViewProps {
  model: DealCard;
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealCardView: React.FC<DealCardViewProps> = (props) => {
  switch (props.model.dealType) {
    case "Stock": {
      return <BuyStockView {...props} />;
    }
    case "Property": {
      return <BuyPropertyView {...props} />;
    }
    case "StockSplit": {
      return <StockSplitView {...props} />;
    }
  }
};

const StockSplitView: React.FC<DealCardViewProps> = ({
  onDismiss,
  model,
  forPlayer: p,
}) => {
  const info = model.info as StockSplit;
  return (
    <View>
      <Text>{model.title}</Text>
      <Text>{model.text}</Text>
      <Text>
        {info.id} split From {info.splitFrom} to {info.splitTo}.
      </Text>
      <Btn
        title="Dismiss"
        onPress={() => {
          p.splitStock(info.id, info.splitFrom, info.splitTo);
          onDismiss();
        }}
        style={styles.userActionButton}
      />
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
  const stock = model.info as Stock;
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
  const property = model.info as Property;
  const playerCantAffordIt = p.cash < property.downPayment;
  if (playerCantAffordIt) {
    buttonTitle += `(Must Borrow $${property.downPayment - p.cash})`;
  }

  const playerAlreadyOwnsProperty = p.doesAlreadyOwnProperty(model.info.id);

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
        {playerAlreadyOwnsProperty ? (
          <Text>You Can't Buy this property because you already own it.</Text>
        ) : (
          <Btn
            title={buttonTitle}
            onPress={buyProperty}
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
