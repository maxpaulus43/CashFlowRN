import React from "react";
import { View, Text } from "react-native";
import BoardModel from "../model/BoardModel";

interface BoardProps {
    model: BoardModel
}

const Board: React.FC<BoardProps> = ({model}) => {
  return <View><Text>{JSON.stringify(model)}</Text></View>;
};

export default Board;
