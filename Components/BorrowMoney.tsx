import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";
export interface BorrowMoneyOptions {
  message?: string;
  initialBorrowAmount?: number;
}
interface BorrowMoneyProps extends BorrowMoneyOptions {
  forPlayer: Player;
  onDismiss: () => void;
}

const BorrowMoney: React.FC<BorrowMoneyProps> = ({
  forPlayer: p,
  onDismiss,
  message,
  initialBorrowAmount,
}) => {
  let amt = initialBorrowAmount ?? 1000;
  amt = Math.ceil(amt / 1000) * 1000;
  const [loanAmount, setLoanAmount] = useState(amt);
  return (
    <View>
      {message && <Txt>{message}</Txt>}
      <Txt style={{ textAlign: "center" }}>How Much: </Txt>
      <Picker<number>
        itemStyle={{ height: 100 }}
        selectedValue={loanAmount}
        onValueChange={setLoanAmount}
      >
        {Array.from(Array(500).keys()).map((i) => {
          const n = (i + 1) * 1000;
          return (
            <Picker.Item label={"$" + n.toLocaleString()} key={n} value={n} />
          );
        })}
      </Picker>
      <View style={{ flexDirection: "row" }}>
        <Btn
          style={{ flex: 1 }}
          title="Borrow"
          onPress={() => {
            p.borrowMoneyAmount(loanAmount);
            onDismiss();
          }}
        />
        <Btn title="Cancel" onPress={onDismiss} style={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default BorrowMoney;
