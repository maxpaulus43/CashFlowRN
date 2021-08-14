import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useState } from "react";
import { Button, View, Text, Alert } from "react-native";
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
import BorrowMoney, { BorrowMoneyOptions } from "../Components/BorrowMoney";
import SideSheet from "../Components/SideSheet";
import Donate from "../Components/Donate";
import DealModel from "../model/DealCard";
import LoseMoneyModel from "../model/LoseMoneyCard";
import SellAssetModel from "../model/SellAssetCard";
import DealCardFlow from "../Components/DealCardFlow";
import Downsize from "../Components/Downsize";
import NewChild from "../Components/NewChild";

const Game: React.FC<NativeStackScreenProps<any, any>> = ({
  route,
  navigation,
}) => {
  const game = route.params?.game as GameModel;
  const myPlayer = route.params?.player as Player;
  const [, updateScreen] = useReducer((x) => x + 1, 0);
  const isMyTurn = game.getCurrentPlayer().id === myPlayer.id;
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>();
  const clearBottomSheet = () => setBottomSheetContent(undefined);
  const [showDeal, setShowDeal] = useState(false);
  const [loseMoneyCard, setLoseMoneyCard] = useState<LoseMoneyModel>();
  const [sellAssetCard, setSellAssetCard] = useState<SellAssetModel>();
  const [showDonate, setShowDonate] = useState(false);
  const [showNewChild, setShowNewChild] = useState(false);
  const [showDownsize, setShowDownsize] = useState(false);
  const isModalVisible: boolean =
    showDeal ||
    loseMoneyCard !== undefined ||
    sellAssetCard !== undefined ||
    showDonate ||
    showDownsize ||
    showNewChild;

  const roll = () => {
    game.rollForCurrentPlayer();
    const space = game.getSpaceForCurrentPlayer();
    switch (space) {
      case Space.DEAL: {
        setShowDeal(true);
        break;
      }
      case Space.LOSE_MONEY: {
        setLoseMoneyCard(game.drawLoseMoneyCard());
        break;
      }
      case Space.SELL_ASSET: {
        setSellAssetCard(game.drawSellAssetCard());
        break;
      }
      case Space.DONATE: {
        setShowDonate(true);
        break;
      }
      case Space.DOWNSIZE: {
        setShowDownsize(true);
        break;
      }
      case Space.NEW_CHILD: {
        setShowNewChild(true);
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

  const presentBorrowBottomSheet = (options?: BorrowMoneyOptions) => {
    setBottomSheetContent(
      <BorrowMoney
        forPlayer={myPlayer}
        onDismiss={clearBottomSheet}
        {...options}
      />
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
          <Button
            title="Repay"
            onPress={presentRepayBottomSheet}
            disabled={myPlayer.liabilities.length <= 0}
          />
          <Button title="Borrow" onPress={() => presentBorrowBottomSheet()} />
          {!myPlayer.didRoll ? (
            <Button title="Roll" onPress={roll} />
          ) : (
            <Button title="End Turn" onPress={endTurn} />
          )}
        </>
      )}

      <Modal isVisible={isModalVisible}>
        {showDeal && (
          <DealCardFlow
            game={game}
            forPlayer={myPlayer}
            onPayFail={(amountNeeded: number) => {
              presentBorrowBottomSheet({ initialBorrowAmount: amountNeeded });
            }}
            onDismiss={() => {
              setShowDeal(false);
            }}
          />
        )}
        {loseMoneyCard && (
          <LoseMoneyCard
            forPlayer={myPlayer}
            model={loseMoneyCard}
            onPayFail={() => {
              presentBorrowBottomSheet();
            }}
            onDismiss={() => setLoseMoneyCard(undefined)}
          />
        )}
        {sellAssetCard && (
          <SellAssetCard
            model={game.drawSellAssetCard()}
            forPlayer={myPlayer}
            onDismiss={() => setSellAssetCard(undefined)}
          />
        )}
        {showDonate && (
          <Donate forPlayer={myPlayer} onDismiss={() => setShowDonate(false)} />
        )}
        {showDownsize && (
          <Downsize
            forPlayer={myPlayer}
            onPayFail={() => {}}
            onDismiss={() => setShowDownsize(false)}
          />
        )}
        {showNewChild && (
          <NewChild
            forPlayer={myPlayer}
            onDismiss={() => setShowNewChild(false)}
          />
        )}
      </Modal>

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
