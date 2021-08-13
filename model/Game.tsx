import BoardModel, { Space } from "./Board";
import DealCard from "./DealCard";
import Deck from "./Deck";
import LoseMoneyCard from "./LoseMoneyCard";
import Player from "./Player";
import SellAssetCard from "./SellAssetCard";

export default class Game {
  private _winHandler?: (winner: Player) => void;
  readonly board: BoardModel;
  readonly players: Player[];
  private currentPlayerIdx: number;
  private bigDealDeck: Deck<DealCard>;
  private smallDealDeck: Deck<DealCard>;
  private sellAssetDeck: Deck<SellAssetCard>;
  private loseMoneyDeck: Deck<LoseMoneyCard>;
  private isGameOver = false;

  constructor(players: Player[]) {
    this.players = players;
    this.bigDealDeck = Deck.makeBigDealDeck();
    this.smallDealDeck = Deck.makeSmallDealDeck();
    this.sellAssetDeck = Deck.makeSellAssetDeck();
    this.loseMoneyDeck = Deck.makeLoseMoneyDeck();
    this.currentPlayerIdx = 0;
    this.board = new BoardModel();
    for (const p of players) {
      this.board.addPlayer(p.id);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIdx];
  }

  rollForCurrentPlayer() {
    const currentPlayer = this.getCurrentPlayer();
    const n = currentPlayer.rollDice();
    currentPlayer.didRoll = true;
    this.board.updatePlayerPositionByN(currentPlayer, n);
  }

  drawBigDealCard(): DealCard {
    if (!this.bigDealDeck.hasCards()) {
      this.bigDealDeck = Deck.makeBigDealDeck();
    }
    return this.bigDealDeck.drawCard()!;
  }

  drawSmallDealCard(): DealCard {
    if (!this.smallDealDeck.hasCards()) {
      this.smallDealDeck = Deck.makeSmallDealDeck();
    }
    return this.smallDealDeck.drawCard()!;
  }

  drawLoseMoneyCard(): LoseMoneyCard {
    if (!this.loseMoneyDeck.hasCards()) {
      this.loseMoneyDeck = Deck.makeLoseMoneyDeck();
    }
    return this.loseMoneyDeck.drawCard()!;
  }

  drawSellAssetCard(): SellAssetCard {
    if (!this.sellAssetDeck.hasCards()) {
      this.sellAssetDeck = Deck.makeSellAssetDeck();
    }
    return this.sellAssetDeck.drawCard()!;
  }

  getSpaceForCurrentPlayer(): Space {
    const currentPlayerId = this.getCurrentPlayer().id;
    const spaceType = this.board.getSpaceForPlayer(currentPlayerId);
    return spaceType;
  }

  endTurn() {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.getCurrentPlayer().didRoll = false;
  }

  public get winHandler(): ((winner: Player) => void) | undefined {
    return this._winHandler;
  }
  public set winHandler(value: ((winner: Player) => void) | undefined) {
    this._winHandler = (winner: Player) => {
      this.isGameOver = true;
      if (value) {
        value(winner);
      }
    };
    for (const p of this.players) {
      p.winHandler = this._winHandler;
    }
  }
}
