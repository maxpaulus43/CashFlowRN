import React from "react";
import { Button, View } from "react-native";
import Player from "../model/Player";

interface DonateProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const Donate: React.FC<DonateProps> = ({ forPlayer: p, onDismiss }) => {
  const donateAmount = p.totalIncome() * 0.1;
  const playerCanDonate = p.cash >= donateAmount;
  let buttonTitle = "Donate";
  if (!playerCanDonate) {
    buttonTitle += " (Insufficient Funds)";
  }
  return (
    <View>
      {p.cash > donateAmount && (
        <Button
          disabled={!playerCanDonate}
          title={buttonTitle}
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
