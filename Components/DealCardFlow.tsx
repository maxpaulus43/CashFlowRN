import React, { useState } from "react";
import { View } from "react-native";
import DealModel from "../model/DealCard";
import Game from "../model/Game";
import Player from "../model/Player";
import Btn from "./Btn";
import DealCard from "./DealCard";

interface props {
  forPlayer: Player;
  game: Game;
  onPayFail: (amountNeeded: number) => void;
  onDismiss: () => void;
}

const DealCardFlow: React.FC<props> = ({
  forPlayer: myPlayer,
  game,
  onPayFail,
  onDismiss,
}) => {
  const [deal, setDeal] = useState<DealModel>();
  return deal ? (
    <DealCard
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

export default DealCardFlow;
