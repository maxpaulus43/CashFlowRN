import React from "react";
import { View } from "react-native";
import Player from "../model/Player";
import Table from "./Table";

interface PlayerInfoProps {
  forPlayer: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ forPlayer: p }) => {
  const playerData = [
    ["Cash", p.cash],
    ["Active Income", p.salary],
    ["Passive Income", p.passiveIncome()],
    ["Total Income", p.totalIncome()],
    ["Total Expenses", p.expenses()],
    ["PayDay", p.paydayAmount()],
  ];
  return (
    <View>
      <Table data={playerData} style={{ minWidth: 150 }} />
    </View>
  );
};

export default PlayerInfo;
