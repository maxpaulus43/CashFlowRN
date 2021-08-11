import React, { useRef, useState } from "react";
import { View, Text, Button } from "react-native";
import Liability from "../model/Liability";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";

interface RepayMoneyProps {
  forPlayer: Player;
  onPaid: () => void;
  onDismiss: () => void;
}
const RepayMoney: React.FC<RepayMoneyProps> = ({
  forPlayer: p,
  onPaid,
  onDismiss,
}) => {
  const repayAmount = useRef(1000);
  const [selectedLiability, setSelectedLiability] = useState<Liability>();
  return (
    <View>
      {p.liabilities.map((l) => (
        <Text>
          {l.name}, {l.debtAmount}
        </Text>
      ))}
      <Text>How Much would you like to repay?</Text>
      <NumberPicker
        increment={repayAmount.current}
        onChangeValue={(value) => {
          repayAmount.current = value;
        }}
      />

      <Button
        title="Repay"
        disabled={!selectedLiability}
        onPress={() => {
          p.payLiability(selectedLiability!, repayAmount.current);
          onPaid();
        }}
      />
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default RepayMoney;
