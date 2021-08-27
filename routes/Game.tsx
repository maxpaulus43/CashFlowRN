import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useRef, useState } from "react";
import { Button, View, Text, Alert } from "react-native";
import BalanceSheet from "../Components/BalanceSheet";
import Board, { PIECE_MOVE_ANIMATION_DURATION } from "../Components/Board";
import BottomSheet from "../Components/BottomSheet";
import Modal from "../Components/Modal";
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
import LoseMoneyModel from "../model/LoseMoneyCard";
import SellAssetModel from "../model/SellAssetCard";
import DealCardFlow from "../Components/DealCardFlow";
import Downsize from "../Components/Downsize";
import NewChild from "../Components/NewChild";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../Components/Btn";

const Game: React.FC<NativeStackScreenProps<any, any>> = ({
  route,
  navigation,
}) => {
  const game = route.params?.game as GameModel;
  const myPlayer = route.params?.player as Player;
  const [, updateScreen] = useReducer((x) => x + 1, 0);
  const isMyTurn = game.getCurrentPlayer().id === myPlayer.id;

  const [showDealFlow, setShowDealFlow] = useState(false);
  const [loseMoneyCard, setLoseMoneyCard] = useState<LoseMoneyModel>();
  const [sellAssetCard, setSellAssetCard] = useState<SellAssetModel>();
  const [showDonate, setShowDonate] = useState(false);
  const [showNewChild, setShowNewChild] = useState(false);
  const [showDownsize, setShowDownsize] = useState(false);
  const isModalVisible: boolean =
    showDealFlow ||
    loseMoneyCard !== undefined ||
    sellAssetCard !== undefined ||
    showDonate ||
    showDownsize ||
    showNewChild;
  const [isGameOver, setIsGameOver] = useState(false);

  const [showBorrowBottomSheet, setShowBorrowBottomSheet] = useState(false);
  const [showRepayBottomSheet, setShowRepayBottomSheet] = useState(false);
  const isBottomSheetVisible = showBorrowBottomSheet || showRepayBottomSheet;
  const borrowMoneyOptions = useRef<BorrowMoneyOptions>();
  const clearBottomSheet = () => {
    setShowBorrowBottomSheet(false);
    setShowRepayBottomSheet(false);
    borrowMoneyOptions.current = undefined;
  };

  const roll = () => {
    game.rollForCurrentPlayer();
    const space = game.getSpaceForCurrentPlayer();
    updateScreen();
    setTimeout(() => {
      switch (space) {
        case Space.DEAL: {
          setShowDealFlow(true);
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
    }, PIECE_MOVE_ANIMATION_DURATION);
  };

  const presentRepayBottomSheet = () => {
    setShowRepayBottomSheet(true);
  };

  const presentBorrowBottomSheet = (options?: BorrowMoneyOptions) => {
    borrowMoneyOptions.current = options;
    setShowBorrowBottomSheet(true);
  };

  const endTurn = () => {
    game.endTurn();
    updateScreen();
  };

  const goHome = () => {
    navigation.popToTop();
  };

  game.winHandler = (p: Player) => {
    Alert.alert(p.name + " won the game by becoming financially free!");
    setIsGameOver(true);
  };

  game.loseHandler = (p: Player) => {
    // todo instead of losing, just sell assets
    Alert.alert(p.name + " lost the game by going bankrupt!");
    setIsGameOver(true);
  };

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.content]}>
      <View style={styles.header}>
        <Button title="Go Home" onPress={goHome} />
        <Text>Current Player: {game.getCurrentPlayer().name}</Text>
      </View>

      <View style={styles.body}>
        <Board
          model={game.board}
          renderCenterContent={() => <PlayerInfo forPlayer={myPlayer} />}
        />
      </View>

      <View style={styles.footer}>
        {isMyTurn && (
          <>
            <View style={styles.userActions}>
              <Btn
                title="Repay"
                onPress={presentRepayBottomSheet}
                disabled={isGameOver || myPlayer.liabilities.length <= 0}
              />
              <Btn
                title="Borrow"
                onPress={() => presentBorrowBottomSheet()}
                disabled={isGameOver}
              />
            </View>

            {!myPlayer.didRoll ? (
              <Btn title="Roll 🎲" onPress={roll} disabled={isGameOver} />
            ) : (
              <Btn title="End Turn" onPress={endTurn} disabled={isGameOver} />
            )}
          </>
        )}
      </View>

      <Modal isVisible={isModalVisible}>
        {showDealFlow && (
          <DealCardFlow
            game={game}
            forPlayer={myPlayer}
            onPayFail={(amountNeeded: number) => {
              presentBorrowBottomSheet({ initialBorrowAmount: amountNeeded });
            }}
            onDismiss={() => {
              setShowDealFlow(false);
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
            onPayFail={(initialBorrowAmount: number) => {
              presentBorrowBottomSheet({ initialBorrowAmount });
            }}
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

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onDismiss={clearBottomSheet}
      >
        {showBorrowBottomSheet && (
          <BorrowMoney
            forPlayer={myPlayer}
            onDismiss={clearBottomSheet}
            {...borrowMoneyOptions.current}
          />
        )}
        {showRepayBottomSheet && (
          <RepayMoney
            forPlayer={myPlayer}
            onPaid={updateScreen}
            onDismiss={clearBottomSheet}
          />
        )}
      </BottomSheet>

      <SideSheet>
        <BalanceSheet forPlayer={myPlayer} />
      </SideSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {},
  userActions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Game;
