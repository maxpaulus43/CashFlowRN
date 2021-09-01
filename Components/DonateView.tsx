import React from "react";
import { View, Text } from "react-native";
import Player from "../model/Player";
import Btn from "./Btn";

interface DonateViewProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const DonateView: React.FC<DonateViewProps> = ({ forPlayer: p, onDismiss }) => {
  const donateAmount = p.totalIncome() * 0.1;
  const playerCanDonate = p.cash >= donateAmount;
  let buttonTitle = "Donate";
  if (!playerCanDonate) {
    buttonTitle += " (Insufficient Funds)";
  }
  return (
    <View>
      <Text>
        Donate 10% of your income to roll 2 dice for the next 3 turns.
      </Text>
      {p.cash > donateAmount && (
        <Btn
          disabled={!playerCanDonate}
          title={buttonTitle}
          onPress={() => {
            p.takeCash(donateAmount);
            p.addDonationDice(3);
            onDismiss();
          }}
        />
      )}
      <Btn title="Dismiss" onPress={onDismiss} />
    </View>
  );
};

export default DonateView;
