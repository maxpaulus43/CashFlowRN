import BoardModel from "./BoardModel";
import Player from "./Player";

export default class Game {
  readonly board: BoardModel;
  readonly players: Player[];
  private currentPlayerIdx: number;

  constructor(players: Player[]) {
    this.players = players;
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
