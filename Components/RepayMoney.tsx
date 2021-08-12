import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";
import NumberPicker from "./NumberPicker";

interface RepayMoneyProps {
  forPlayer: Player;
  onPaid: () => void;
  onDismiss: () => void;
}
const RepayMoney: React.FC<RepayMoneyProps> = ({ forPlayer: p, onDismiss }) => {
  const [repayAmount, setRepayAmount] = useState(1000);
  const [selectedLiability, setSelectedLiability] = useState<string>(
    p.liabilities[0]?.id
  );
  return (
    <View>
      <Picker
        selectedValue={selectedLiability}
        itemStyle={{
          height: 100,
        }}
        onValueChange={(value: string) => {
          setSelectedLiability(value);
        }}
      >
        {p.liabilities.map((l) => (
          <Picker.Item
            label={`${l.name} ($${l.debtAmount})`}
            key={l.id}
            value={l.id}
          />
        ))}
      </Picker>
      <Text>How Much would you like to repay?</Text>
      <NumberPicker increment={1000} onChangeValue={setRepayAmount} />

      <Button
        title="Repay"
        disabled={!selectedLiability || p.cash < repayAmount}
        onPress={() => {
          p.payAmountForLiability(repayAmount, selectedLiability);
          // setSelectedLiability(p.liabilities[0]?.id);
          // onPaid();
          onDismiss();
        }}
      />
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default RepayMoney;
