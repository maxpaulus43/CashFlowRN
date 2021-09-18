import React from "react";
import { View, StyleSheet } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Price from "./Price";
import Txt from "./Txt";

const spacer = <View style={{ height: 15 }} />;
interface DownsizeViewProps {
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DownsizeView: React.FC<DownsizeViewProps> = ({
  forPlayer: p,
  onPayFail,
  onDismiss,
}) => {
  const mustBorrowAmt = p.expenses() - p.cash;
  const title = `Pay${
    mustBorrowAmt > 0
      ? ` (Must borrow at least ${mustBorrowAmt.toLocaleString()})`
      : ""
  }`;

  return (
    <View style={styles.card}>
      <Txt bold>Downsized!</Txt>
      {spacer}

      <Txt>
        You must pay a full set of your expenses! (
        <Price value={p.expenses()} />)
      </Txt>

      <View style={{ flex: 1 }} />

      <View style={{ flexDirection: "row" }}>
        <Btn
          title={title}
          style={{ minWidth: 100 }}
          onPress={() => {
            // todo skip 2 turns
            if (mustBorrowAmt > 0) {
              onPayFail(mustBorrowAmt);
            } else {
              p.takeCash(p.expenses());
              onDismiss();
            }
          }}
        />
      </View>
    </View>
  );
};

export default DownsizeView;

const styles = StyleSheet.create({
  card: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userActionButton: {
    flex: 1,
    backgroundColor: "#07beb8",
  },
});
