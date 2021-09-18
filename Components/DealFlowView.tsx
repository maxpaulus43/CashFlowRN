import React, { useState } from "react";
import { View } from "react-native";
import { DealCard, Game, Player } from "../model";
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
  const [card, setCard] = useState<DealCard>();
  return card ? (
    <DealCardView
      forPlayer={myPlayer}
      card={card}
      onPayFail={onPayFail}
      onDismiss={onDismiss}
    />
  ) : (
    <View>
      <Btn
        title="Big Deal"
        onPress={() => {
          setCard(game.drawBigDealCard());
        }}
      />
      <Btn
        title="Small Deal"
        onPress={() => {
          setCard(game.drawSmallDealCard());
        }}
      />
      <Btn title="Cancel" onPress={onDismiss} />
    </View>
  );
};

export default DealFlowView;
