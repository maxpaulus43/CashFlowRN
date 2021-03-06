import React from "react";
import { View } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";

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
  } else {
    buttonTitle += `($${donateAmount.toLocaleString()})`;
  }
  return (
    <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
      <Txt>Donate 10% of your income to roll 2 dice for the next 3 turns.</Txt>

      <View style={{flexDirection: "row"}}>
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
    </View>
  );
};

export default DonateView;
