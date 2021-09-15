import React from "react";
import { View } from "react-native";
import { Player } from "../model";
import Table from "./Table";

interface PlayerInfoProps {
  forPlayer: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ forPlayer: p }) => {
  const playerData = [
    ["Cash", "$" + p.cash.toLocaleString()],
    ["Income", "$" + p.totalIncome().toLocaleString()],
    ["Expenses", "$" + p.expenses().toLocaleString()],
    ["PayDay", "$" + p.paydayAmount().toLocaleString()],
  ];
  return (
    <View>
      <Table data={playerData} style={{ minWidth: 150 }} />
    </View>
  );
};

export default PlayerInfo;
