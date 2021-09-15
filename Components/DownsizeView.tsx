import React from "react";
import { View } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Price from "./Price";
import Txt from "./Txt";

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
    mustBorrowAmt > 0 ? ` (Must borrow at least ${mustBorrowAmt.toLocaleString()})` : ""
  }`;

  return (
    <View>
      <Txt bold>Downsized!</Txt>
      <Txt>
        You must pay a full set of your expenses! (
        <Price value={p.expenses()} />)
      </Txt>
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
