import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useState } from "react";
import { Button, View, Text, Dimensions, Alert } from "react-native";
import BalanceSheet from "../Components/BalanceSheet";
import Board from "../Components/Board";
import BottomSheet from "../Components/BottomSheet";
import Modal from "../Components/Modal";
import DealCard from "../Components/DealCard";
import LoseMoneyCard from "../Components/LoseMoneyCard";
import SellAssetCard from "../Components/SellAssetCard";
import { Space } from "../model/Board";
import GameModel from "../model/Game";
import Player from "../model/Player";

const Game: React.FC<NativeStackScreenProps<any, any>> = ({
  route,
  navigation,
}) => {
  const game = route.params?.game as GameModel;
  const myPlayer = route.params?.player as Player;
  const [, updateScreen] = useReducer((x) => x + 1, 0);
  const isMyTurn = game.getCurrentPlayer().id === myPlayer.id;
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const clearModal = () => setModalContent(undefined);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>();
  const clearBottomSheet = () => setBottomSheetContent(undefined);

  const roll = () => {
    game.rollForCurrentPlayer();
    const space = game.getSpaceForCurrentPlayer();
    switch (space) {
      case Space.DEAL: {
        setModalContent(
          <View>
            <Button
              title="big deal"
              onPress={() => {
                setModalContent(
                  <DealCard
                    model={game.drawBigDealCard()}
                    onDismiss={clearModal}
                  />
                );
              }}
            />
            <Button
              title="small deal"
              onPress={() => {
                setModalContent(
                  <DealCard
                    model={game.drawSmallDealCard()}
                    onDismiss={clearModal}
                  />
                );
              }}
            />
          </View>
        );

        break;
      }
      case Space.LOSE_MONEY: {
        setModalContent(
          <LoseMoneyCard
            model={game.drawLoseMoneyCard()}
            onDismiss={clearModal}
          />
        );
        break;
      }
      case Space.SELL_ASSET: {
        setModalContent(
          <SellAssetCard
            model={game.drawSellAssetCard()}
            onDismiss={clearModal}
          />
        );
        break;
      }
      case Space.DONATE: {
        setModalContent(
          <View>
            <Text>Donate</Text>
            <Button title="Dismiss" onPress={clearModal} />
          </View>
        );
        break;
      }
      case Space.DOWNSIZE: {
        setModalContent(
          <View>
            <Text>Downsized!</Text>
            <Button title="Dismiss" onPress={clearModal} />
          </View>
        );
        break;
      }
      case Space.NEW_CHILD: {
        setModalContent(
          <View>
            <Text>New Child!</Text>
            <Button title="Dismiss" onPress={clearModal} />
          </View>
        );
        break;
      }
    }
  };

  const presentRepayBottomSheet = () => {
    setBottomSheetContent(<View><Text>Repay</Text></View>);
  };

  const presentBorrowBottomSheet = () => {
    setBottomSheetContent(<View><Text>Borrow</Text></View>);
  };

  const endTurn = () => {
    game.endTurn();
    updateScreen();
  };

  const goHome = () => {
    navigation.popToTop();
  };

  game.winHandler = (p: Player) => {
    setModalContent(
      <View>
        <Text>{p.name} won the game!!</Text>
        <Button title="Dismiss" onPress={clearBottomSheet} />
        <Button title="Go Home" onPress={goHome} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go Home" onPress={goHome} />
      <Text>Current Player: {game.getCurrentPlayer().name}</Text>
      <Board model={game.board} />
      {isMyTurn && (
        <>
          {!myPlayer.didRoll ? (
            <Button title="Roll" onPress={roll} />
          ) : (
            <>
              <Button title="Repay" onPress={presentRepayBottomSheet} />
              <Button title="Borrow" onPress={presentBorrowBottomSheet} />
              <Button title="End Turn" onPress={endTurn} />
            </>
          )}
        </>
      )}
      <Modal>{modalContent}</Modal>
      <BottomSheet onDismiss={clearBottomSheet}>
        {bottomSheetContent}
      </BottomSheet>
      <BalanceSheet forPlayer={myPlayer} />
    </View>
  );
};

export default Game;
