import React from "react";
import { View, Text } from "react-native";
import Player from "../model/Player";

interface PlayerInfoProps {
  forPlayer: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ forPlayer: p }) => {
  return (
    <View>
      <Text>Cash: {p.cash}</Text>
      <Text>Active Income: {p.salary}</Text>
      <Text>Passive Income: {p.passiveIncome()}</Text>
      <Text>Total Income: {p.totalIncome()}</Text>
      <Text>Total Expenses: -{p.expenses()}</Text>
      <Text>----------------------------</Text>
      <Text>PayDay: {p.paydayAmount()}</Text>
    </View>
  );
};

export default PlayerInfo;
