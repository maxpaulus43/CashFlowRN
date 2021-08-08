import BoardModel, { SpaceType } from "./BoardModel";
import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

export default class Game {
  readonly board: BoardModel;
  readonly players: Player[];
  private currentPlayerIdx: number;
  private dealDeck: Deck;
  private assetSuccessDeck: Deck;
  private assetProblemDeck: Deck;

  constructor(players: Player[]) {
    this.players = players;
    this.dealDeck = new Deck();
    this.assetSuccessDeck = new Deck();
    this.assetProblemDeck = new Deck();
    this.currentPlayerIdx = 0;
    this.board = new BoardModel();
    for (const p of players) {
      this.board.addPlayer(p.id);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIdx];
  }

  applyDiceRollToCurrentPlayer(roll: number) {
    const currentPlayerId = this.getCurrentPlayer().id;
    this.board.updatePlayerPositionByN(currentPlayerId, roll);
  }

  pickCardForCurrentPlayerSpace(): Card {
    const currentPlayerId = this.getCurrentPlayer().id;
    const spaceType = this.board.getSpaceForPlayer(currentPlayerId);
    switch (spaceType) {
      case SpaceType.DEAL:
        return this.dealDeck.drawCard();
      case SpaceType.ASSET_PROBLEM:
        return this.assetProblemDeck.drawCard();
      case SpaceType.ASSET_SUCCESS:
        return this.assetSuccessDeck.drawCard();
      default:
        return this.dealDeck.drawCard(); // todo fix
    }
  }

  endTurn() {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.getCurrentPlayer().didRoll = false;
  }

  isGameOver(): boolean {
    for (let p of this.players) {
      if (p.passiveIncome > p.expenses) {
        return true;
      }
    }
    return false;
  }
}
