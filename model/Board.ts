import Player from "./Player";

export enum Space {
  DEAL,
  DOWNSIZE,
  PAYDAY,
  NEW_CHILD,
  SELL_ASSET,
  LOSE_MONEY,
  DONATE,
}
export default class Board {
  private spaces = [
    Space.DEAL,
    Space.SELL_ASSET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.DOWNSIZE,
    Space.DEAL,
    Space.PAYDAY,
    Space.DEAL,
    Space.SELL_ASSET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.DONATE,
    Space.DEAL,
    Space.PAYDAY,
    Space.DEAL,
    Space.SELL_ASSET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.NEW_CHILD,
    Space.DEAL,
    Space.PAYDAY,
  ];
  private playerPosition: { [playerId: string]: number } = {};

  getPlayerIds(): string[] {
    return Object.keys(this.playerPosition);
  }

  addPlayer(playerId: string) {
    this.playerPosition[playerId] = 9;
  }

  updatePlayerPositionByN(player: Player, n: number) {
    const oldPosition = this.playerPosition[player.id];
    const newPosition = (oldPosition + n) % this.spaces.length;
    if (Math.floor(oldPosition / 8) !== Math.floor(newPosition % 8)) {
      player.getPaid();
    }
    this.playerPosition[player.id] = newPosition;
  }

  getPositionForPlayer(playerId: string): number {
    return this.playerPosition[playerId];
  }

  getSpaceForPlayer(playerId: string): Space {
    return this.spaces[this.playerPosition[playerId]];
  }
}
