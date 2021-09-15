import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DealCard, Property, Stock, Player, StockSplit } from "../model";
import Btn from "./Btn";
import NumberPicker from "./NumberPicker";
import Txt from "./Txt";

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
      <Txt>{model.title}</Txt>
      <Txt>{model.text}</Txt>
      <Txt>
        {info.id} split From {info.splitFrom} to {info.splitTo}.
      </Txt>
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
  const playersExistingStockCount = p.amountOfStockForId(stock.id);
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
        <Txt>STOCK DEAL</Txt>
        <Txt>{model.title}</Txt>
        <Txt>{model.text}</Txt>
        <Txt>Cost: {stock.cost}</Txt>
        <Txt>Cash Flow: {stock.cashFlow}</Txt>
        <Txt>How Many Stocks?</Txt>
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
          <Txt>PROPERTY DEAL</Txt>
          <Txt>{model.title}</Txt>
        </View>

        <View>
          <Txt>{model.text}</Txt>
        </View>

        <View>
          <Txt>Cost: {property.cost}</Txt>
          <Txt>Cash Flow: {property.cashFlow}</Txt>
          <Txt>Down Payment:{property.downPayment}</Txt>
        </View>
      </View>

      <View style={{ maxWidth: "80%" }}>
        {playerAlreadyOwnsProperty ? (
          <Txt>You Can't Buy this property because you already own it.</Txt>
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
