import React from "react";
import { Button, View } from "react-native";
import Player from "../model/Player";

interface DonateProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const Donate: React.FC<DonateProps> = ({ forPlayer: p, onDismiss }) => {
  const donateAmount = p.totalIncome() * 0.1;
  return (
    <View>
      {p.cash > donateAmount && (
        <Button
          title="Donate"
          onPress={() => {
            p.takeCash(donateAmount);
            p.addDonationDice(3);
            onDismiss();
          }}
        />
      )}
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default Donate;
