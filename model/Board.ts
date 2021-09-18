import Player from "./Player";

export enum Space {
  DEAL = "Deal",
  DOWNSIZE = "Downsize",
  PAYDAY = "Pay Day",
  NEW_CHILD = "New Child",
  MARKET = "Market",
  LOSE_MONEY = "Loss",
  DONATE = "Donate",
}
export default class Board {
  readonly spaces = [
    Space.DEAL,
    Space.MARKET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.DOWNSIZE,
    Space.DEAL,
    Space.PAYDAY,
    Space.DEAL,
    Space.MARKET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.DONATE,
    Space.DEAL,
    Space.PAYDAY,
    Space.DEAL,
    Space.MARKET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.NEW_CHILD,
    Space.DEAL,
    Space.PAYDAY,
  ];
  private playerPosition: { [playerId: string]: number } = {};
  gotPaidHandler?: () => void;

  getPlayerIds(): string[] {
    return Object.keys(this.playerPosition);
  }

  addPlayer(playerId: string) {
    this.playerPosition[playerId] = 9;
  }

  updatePlayerPositionByN(player: Player, n: number) {
    const oldPosition = this.playerPosition[player.id];
    const newPosition = (oldPosition + n) % this.spaces.length;
    this.playerPosition[player.id] = newPosition;
    if (
      Math.floor((oldPosition + 1) / 8) !== Math.floor((newPosition + 1) / 8)
    ) {
      player.getPaid();
      if (this.gotPaidHandler) {
        this.gotPaidHandler();
      }
    }
  }

  getPositionForPlayer(playerId: string): number {
    return this.playerPosition[playerId];
  }

  getSpaceForPlayer(playerId: string): Space {
    return this.spaces[this.playerPosition[playerId]];
  }

  saveData() {
    return {
      playerPosition: this.playerPosition,
    };
  }

  static fromSaveData(d: any) {
    const { playerPosition } = d;
    const b = new Board();
    b.playerPosition = playerPosition;
    return b;
  }
}
