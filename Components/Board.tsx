import React from "react";
import { View, Text } from "react-native";
import BoardModel from "../model/Board";

interface BoardProps {
  model: BoardModel;
}

const Board: React.FC<BoardProps> = ({ model }) => {
  return (
    <View>
      {model.getPlayerIds().map((pId) => (
        <Text key={pId}>
          {pId} position: {model.getPositionForPlayer(pId)}
        </Text>
      ))}
    </View>
  );
};

export default Board;
