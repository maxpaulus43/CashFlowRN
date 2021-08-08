import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useState } from "react";
import { Button, View, Text, Dimensions } from "react-native";
import BalanceSheet from "../Components/BalanceSheet";
import Board from "../Components/Board";
import CardModal from "../Components/CardModal";
import Card from "../model/Card";
import GameModel from "../model/GameModel";
import Player from "../model/Player";

const Game: React.FC<NativeStackScreenProps<any, any>> = ({
  route,
  navigation,
}) => {
  const game = route.params?.game as GameModel;
  const myPlayer = route.params?.player as Player;
  const [, updateScreen] = useReducer((x) => x + 1, 0);
  const isMyTurn = game.getCurrentPlayer().id === myPlayer.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined);

  function presentCard(card: Card) {
    setCurrentCard(card);
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go Home" onPress={() => navigation.popToTop()} />
      <Text>Current Player: {game.getCurrentPlayer().name}</Text>
      <Board model={game.board} />

      {isMyTurn && (
        <>
          {myPlayer.didRoll && (
            <>
              <Button
                title="Repay"
                onPress={() => {
                  // todo present a bottom sheet
                }}
              />
              <Button
                title="Borrow"
                onPress={() => {
                  // todo present bottom sheet
                  myPlayer.borrowMoney(1000);
                  updateScreen();
                }}
              />
              <Button
                title="End Turn"
                onPress={() => {
                  game.endTurn();
                  updateScreen();
                }}
              />
            </>
          )}

          {!myPlayer.didRoll && (
            <Button
              title="Roll"
              onPress={() => {
                const roll = myPlayer.rollDice();
                game.applyDiceRollToCurrentPlayer(roll);
                const card = game.pickCardForCurrentPlayerSpace();
                presentCard(card);
                myPlayer.handleActionForCard(card);

                updateScreen();
              }}
            />
          )}
        </>
      )}

      <CardModal isVisible={modalVisible}>
        <Text>{currentCard?.text}</Text>
        <Button title="Dismiss" onPress={() => setModalVisible(false)} />
      </CardModal>
      <BalanceSheet forPlayer={myPlayer} />
    </View>
  );
};

export default Game;
