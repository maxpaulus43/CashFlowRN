import React, { useState } from "react";
import { View } from "react-native";
import DealCard from "../model/DealCard";
import Game from "../model/Game";
import Player from "../model/Player";
import Btn from "./Btn";
import DealCardView from "./DealCardView";

interface DealFlowViewProps {
  forPlayer: Player;
  game: Game;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealFlowView: React.FC<DealFlowViewProps> = ({
  forPlayer: myPlayer,
  game,
  onPayFail,
  onDismiss,
}) => {
  const [deal, setDeal] = useState<DealCard>();
  return deal ? (
    <DealCardView
      forPlayer={myPlayer}
      model={deal}
      onPayFail={onPayFail}
      onDismiss={onDismiss}
    />
  ) : (
    <View>
      <Btn
        title="Big Deal"
        onPress={() => {
          setDeal(game.drawBigDealCard());
        }}
      />
      <Btn
        title="Small Deal"
        onPress={() => {
          setDeal(game.drawSmallDealCard());
        }}
      />
      <Btn title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default DealFlowView;
