import React, { useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import Liability from "../model/Liability";
import Player from "../model/Player";

interface BorrowMoneyProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const BorrowMoney: React.FC<BorrowMoneyProps> = ({
  forPlayer: p,
  onDismiss,
}) => {
  const loanAmount = useRef(1000);
  return (
    <View>
      <Text>How Much: </Text>
      <TextInput
        onChangeText={(text) => {
          loanAmount.current = parseInt(text);
        }}
      >
        {loanAmount.current}
      </TextInput>
      <Button
        title="Borrow"
        onPress={() => {
          p.giveCash(loanAmount.current);
          p.addLiabiliy(
            new Liability("Loan", loanAmount.current, "Loan Repayment", 0.1)
          );
          onDismiss();
        }}
      />
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default BorrowMoney;
