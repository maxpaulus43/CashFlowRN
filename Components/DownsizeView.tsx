import React from "react";
import { View, Text } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";

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
    mustBorrowAmt > 0 ? ` (Must borrow at least ${mustBorrowAmt})` : ""
  }`;

  return (
    <View>
      <Text>Downsized!</Text>
      <Btn
        title={title}
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
  );
};

export default DownsizeView;
