import React from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";

interface RepayMoneyProps {
  forPlayer: Player;
  onDismiss: () => void;
}
const RepayMoney: React.FC<RepayMoneyProps> = ({ forPlayer: p, onDismiss }) => {
  return (
    <View>
      {p.liabilities.map((l) => (
        <Text>
          {l.name}, {l.debtAmount}
        </Text>
      ))}
      <Text>How Much would you like to repay?</Text>
      <Button title="Repay" onPress={onDismiss} />
    </View>
  );
};

export default RepayMoney;
