export enum Space {
  DEAL,
  DOWNSIZE,
  PAYDAY,
  NEW_CHILD,
  SELL_ASSET,
  LOSE_MONEY,
  DONATE,
}
export default class BoardModel {
  private spaces = [
    Space.PAYDAY,
    Space.DEAL,
    Space.SELL_ASSET,
    Space.DEAL,
    Space.LOSE_MONEY,
    Space.DEAL,
    Space.NEW_CHILD,
    Space.DEAL,
    Space.PAYDAY,
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
  ];
  private playerPosition: { [playerId: string]: number } = {};

  addPlayer(playerId: string) {
    this.playerPosition[playerId] = 0;
  }

  updatePlayerPositionByN(playerId: string, n: number) {
    // todo pay player if they passed payday
    this.playerPosition[playerId] =
      (this.playerPosition[playerId] + n) % this.spaces.length;
  }

  getPositionForPlayer(playerId: string): number {
    return this.playerPosition[playerId];
  }

  getSpaceForPlayer(playerId: string): Space {
    return this.spaces[this.playerPosition[playerId]];
  }
}
