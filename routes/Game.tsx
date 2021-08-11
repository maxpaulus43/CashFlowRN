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
import PlayerInfo from "../Components/PlayerInfo";
import RepayMoney from "../Components/RepayMoney";
import BorrowMoney from "../Components/BorrowMoney";
import SideSheet from "../Components/SideSheet";
import Donate from "../Components/Donate";

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
                    forPlayer={myPlayer}
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
                    forPlayer={myPlayer}
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
        const card = game.drawLoseMoneyCard();
        setModalContent(
          <LoseMoneyCard
            forPlayer={myPlayer}
            model={card}
            onPayFail={() => {
              presentBorrowBottomSheet();
            }}
            onDismiss={clearModal}
          />
        );
        break;
      }
      case Space.SELL_ASSET: {
        setModalContent(
          <SellAssetCard
            model={game.drawSellAssetCard()}
            forPlayer={myPlayer}
            onDismiss={clearModal}
          />
        );
        break;
      }
      case Space.DONATE: {
        setModalContent(<Donate forPlayer={myPlayer} onDismiss={clearModal} />);
        break;
      }
      case Space.DOWNSIZE: {
        setModalContent(
          <View>
            <Text>Downsized!</Text>
            <Button
              title="Pay"
              onPress={() => {
                // todo skip 2 turns
                if (myPlayer.cash < myPlayer.expenses()) {
                  presentBorrowBottomSheet();
                } else {
                  myPlayer.takeCash(myPlayer.expenses());
                  clearModal();
                }
              }}
            />
          </View>
        );
        break;
      }
      case Space.NEW_CHILD: {
        setModalContent(
          <View>
            <Text>New Child!</Text>
            <Button
              title="Dismiss"
              onPress={() => {
                myPlayer.addKid();
                clearModal();
              }}
            />
          </View>
        );
        break;
      }
    }
  };

  const presentRepayBottomSheet = () => {
    setBottomSheetContent(
      <RepayMoney
        forPlayer={myPlayer}
        onPaid={updateScreen}
        onDismiss={clearBottomSheet}
      />
    );
  };

  const presentBorrowBottomSheet = () => {
    setBottomSheetContent(
      <BorrowMoney forPlayer={myPlayer} onDismiss={clearBottomSheet} />
    );
  };

  const endTurn = () => {
    game.endTurn();
    updateScreen();
  };

  const goHome = () => {
    navigation.popToTop();
  };

  game.winHandler = (p: Player) => {
    Alert.alert(p.name + " won the game!");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go Home" onPress={goHome} />
      <Text>Current Player: {game.getCurrentPlayer().name}</Text>
      <PlayerInfo forPlayer={myPlayer} />
      <Board model={game.board} />
      {isMyTurn && (
        <>
          <Button title="Repay" onPress={presentRepayBottomSheet} />
          <Button title="Borrow" onPress={presentBorrowBottomSheet} />
          {!myPlayer.didRoll ? (
            <Button title="Roll" onPress={roll} />
          ) : (
            <>
              <Button title="End Turn" onPress={endTurn} />
            </>
          )}
        </>
      )}

      <Modal>{modalContent}</Modal>

      <BottomSheet onDismiss={clearBottomSheet}>
        {bottomSheetContent}
      </BottomSheet>

      <SideSheet>
        <BalanceSheet forPlayer={myPlayer} />
      </SideSheet>
    </View>
  );
};

export default Game;
