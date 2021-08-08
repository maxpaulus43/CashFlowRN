export enum SpaceType {
  DEAL,
  DOWNSIZE,
  PAYDAY,
  NEW_CHILD,
  ASSET_SUCCESS,
  ASSET_PROBLEM,
}
export default class BoardModel {
  private spaces = [
    SpaceType.DEAL,
    SpaceType.PAYDAY,
    SpaceType.DEAL,
    SpaceType.NEW_CHILD,
    SpaceType.ASSET_SUCCESS,
    SpaceType.DEAL,
    SpaceType.ASSET_PROBLEM,
    SpaceType.DEAL,
    SpaceType.DOWNSIZE,
    SpaceType.PAYDAY,
    SpaceType.DEAL,
    SpaceType.ASSET_PROBLEM,
    SpaceType.NEW_CHILD,
    SpaceType.DEAL,
    SpaceType.ASSET_SUCCESS,
    SpaceType.DEAL,
    SpaceType.PAYDAY,
  ];
  private playerPosition: { [playerId: string]: number } = {};

  addPlayer(playerId: string) {
    this.playerPosition[playerId] = 0;
  }

  updatePlayerPositionByN(playerId: string, n: number) {
    this.playerPosition[playerId] =
      (this.playerPosition[playerId] + n) % this.spaces.length;
  }

  getPositionForPlayer(playerId: string): number {
    return this.playerPosition[playerId];
  }

  getSpaceForPlayer(playerId: string): SpaceType {
    return this.spaces[this.playerPosition[playerId]];
  }
}
