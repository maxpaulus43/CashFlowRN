import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer } from "react";
import {
  Button,
  View,
  Text,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BalanceSheet from "../Components/BalanceSheet";
import Board from "../Components/Board";
import GameModel from "../model/GameModel";
import Player from "../model/Player";

const { width, height } = Dimensions.get("window");

const Game: React.FC<NativeStackScreenProps<any, any>> = ({
  route,
  navigation,
}) => {
  const game = route.params?.game as GameModel;
  const myPlayer = route.params?.player as Player;
  const [, updateScreen] = useReducer((x) => x + 1, 0);
  const isMyTurn = game.getCurrentPlayer().id === myPlayer.id;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go Home" onPress={() => navigation.popToTop()} />
      <Text>Current Player: {game.getCurrentPlayer().name}</Text>
      <Board model={game.board} />

      {isMyTurn && (
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
              // todo present a bottom sheet
            }}
          />
          {!myPlayer.didRoll && (
            <Button
              title="Roll"
              onPress={() => {
                const roll = myPlayer.rollDice();
                game.applyDiceRollToCurrentPlayer(roll);
                updateScreen();
              }}
            />
          )}
          <Button
            title="End Turn"
            onPress={() => {
              game.endTurn();
              updateScreen();
            }}
          />
        </>
      )}

      <BalanceSheet forPlayer={myPlayer} />
    </View>
  );
};

export default Game;
