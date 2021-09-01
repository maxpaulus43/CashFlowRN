import Board, { Space } from "./Board";
import DealCard from "./DealCard";
import Deck from "./Deck";
import LoseMoneyCard from "./LoseMoneyCard";
import Player from "./Player";
import MarketCard from "./MarketCard";

export default class Game {
  private _winHandler?: (winner: Player) => void;
  private _loseHandler?: ((loser: Player) => void) | undefined;

  readonly board: Board;
  readonly players: Player[];
  private currentPlayerIdx: number;
  private bigDealDeck: Deck<DealCard>;
  private smallDealDeck: Deck<DealCard>;
  private marketDeck: Deck<MarketCard>;
  private loseMoneyDeck: Deck<LoseMoneyCard>;
  private isGameOver = false;

  constructor(players: Player[]) {
    this.players = players;
    this.bigDealDeck = Deck.makeBigDealDeck();
    this.smallDealDeck = Deck.makeSmallDealDeck();
    this.marketDeck = Deck.makeMarketCardDeck();
    this.loseMoneyDeck = Deck.makeLoseMoneyDeck();
    this.currentPlayerIdx = 0;
    this.board = new Board();
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

  drawMarketCard(): MarketCard {
    if (!this.marketDeck.hasCards()) {
      this.marketDeck = Deck.makeMarketCardDeck();
    }
    return this.marketDeck.drawCard()!;
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

  public get loseHandler(): ((loser: Player) => void) | undefined {
    return this._loseHandler;
  }
  public set loseHandler(value: ((loser: Player) => void) | undefined) {
    this._loseHandler = (loser: Player) => {
      this.isGameOver = true;
      if (value) {
        value(loser);
      }
    };
    for (const p of this.players) {
      p.loseHandler = this._loseHandler;
    }
  }
}
