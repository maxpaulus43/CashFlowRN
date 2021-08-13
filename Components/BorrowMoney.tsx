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
  const loanAmount = useRef(1000);
  return (
    <View>
      {message && <Text>{message}</Text>}
      <Text>How Much: </Text>
      <NumberPicker
        initialValue={initialBorrowAmount ?? loanAmount.current}
        increment={loanAmount.current}
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
