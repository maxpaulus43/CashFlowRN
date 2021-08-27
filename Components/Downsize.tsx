import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";

interface props {
  forPlayer: Player;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const Downsize: React.FC<props> = ({ forPlayer: p, onPayFail, onDismiss }) => {
  const mustBorrowAmt = p.expenses() - p.cash;
  const title = `Pay${
    mustBorrowAmt > 0 ? ` (Must borrow at least ${mustBorrowAmt})` : ""
  }`;

  return (
    <View>
      <Text>Downsized!</Text>
      <Button
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

export default Downsize;
