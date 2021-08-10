import React from "react";
import { View, Text, Button } from "react-native";
import Player from "../model/Player";

interface BorrowMoneyProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const BorrowMoney: React.FC<BorrowMoneyProps> = ({
  forPlayer: p,
  onDismiss,
}) => {
  return (
    <View>
      <Text>How Much: </Text>
      <Button title="Borrow" onPress={onDismiss} />
    </View>
  );
};

export default BorrowMoney;
