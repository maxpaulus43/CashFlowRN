import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";

interface RepayMoneyProps {
  forPlayer: Player;
  onPaid: () => void;
  onDismiss: () => void;
}
const RepayMoney: React.FC<RepayMoneyProps> = ({ forPlayer: p, onDismiss }) => {
  const [selectedLiability, setSelectedLiability] = useState<string>(
    p.liabilities[0]?.id
  );
  const l = p.getLiabilityForId(selectedLiability);
  const [repayAmount, setRepayAmount] = useState(l?.debtAmount ?? 1000);
  return (
    <View>
      <Txt style={{ textAlign: "center" }}>
        Which Liability would you like to pay off?
      </Txt>

      <Picker
        selectedValue={selectedLiability}
        itemStyle={{
          height: 100,
        }}
        onValueChange={(value: string) => {
          setSelectedLiability(value);
          const l = p.getLiabilityForId(value);
          setRepayAmount(l?.debtAmount ?? 1000);
        }}
      >
        {p.liabilities.map((l) => (
          <Picker.Item
            label={`${l.name} ($${l.debtAmount.toLocaleString()})`}
            key={l.id}
            value={l.id}
          />
        ))}
      </Picker>

      <Txt style={{ textAlign: "center" }}>
        How Much would you like to repay?
      </Txt>

      <Picker<number>
        selectedValue={repayAmount}
        itemStyle={{
          height: 100,
        }}
        onValueChange={setRepayAmount}
      >
        {Array.from(
          Array(Math.ceil((l?.debtAmount ?? 1000) / 1000)).keys()
        ).map((i) => {
          return (
            <Picker.Item
              label={`$${((i + 1) * 1000).toLocaleString()}`}
              key={i}
              value={(i + 1) * 1000}
            />
          );
        })}
      </Picker>

      <Btn
        title="Repay"
        disabled={!selectedLiability || p.cash < repayAmount}
        onPress={() => {
          p.payAmountForLiability(repayAmount, selectedLiability);
          onDismiss();
        }}
      />
      <Btn title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default RepayMoney;
