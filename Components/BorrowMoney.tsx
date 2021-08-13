import React, { useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import Liability from "../model/Liability";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";

interface BorrowMoneyProps {
  forPlayer: Player;
  onDismiss: () => void;
  message?: string;
  amountNeeded?: number;
}

const BorrowMoney: React.FC<BorrowMoneyProps> = ({
  forPlayer: p,
  onDismiss,
}) => {
  const loanAmount = useRef(1000);
  return (
    <View>
      <Text>How Much: </Text>
      <NumberPicker
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
