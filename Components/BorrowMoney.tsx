import React, { useRef } from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";
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
  const loanAmount = useRef(amt);
  return (
    <View>
      {message && <Text>{message}</Text>}
      <Text>How Much: </Text>
      <NumberPicker
        initialValue={loanAmount.current}
        increment={1000}
        onChangeValue={(value) => {
          loanAmount.current = value;
        }}
      />
      <Button
        title="Borrow"
        onPress={() => {
          p.borrowMoneyAmount(loanAmount.current);
          onDismiss();
        }}
      />
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default BorrowMoney;
