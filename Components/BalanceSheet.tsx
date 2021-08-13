import React from "react";
import { ScrollView, Text } from "react-native";
import Player from "../model/Player";

interface BalanceSheetProps {
  forPlayer: Player;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: p }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "beige",
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text>Cash: {p.cash}</Text>
      <Text>Active Income: {p.salary}</Text>
      <Text>Passive Income: {p.passiveIncome()}</Text>
      <Text>Total Income: {p.totalIncome()}</Text>
      <Text>Total Expenses: -{p.expenses()}</Text>
      <Text>----------------------------</Text>
      <Text>PayDay: {p.paydayAmount()}</Text>
      {p.liabilities.map(l => (
        <Text key={l.id}>{l.name}</Text>
      ))}
    </ScrollView>
  );
};

export default BalanceSheet;
