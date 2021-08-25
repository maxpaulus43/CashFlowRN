import React, { useState } from "react";
import { Button, View } from "react-native";
import DealModel from "../model/DealCard";
import Game from "../model/Game";
import Player from "../model/Player";
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
      <Button
        title="big deal"
        onPress={() => {
          setDeal(game.drawBigDealCard());
        }}
      />
      <Button
        title="small deal"
        onPress={() => {
          setDeal(game.drawSmallDealCard());
        }}
      />
      <Button title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default DealCardFlow;
