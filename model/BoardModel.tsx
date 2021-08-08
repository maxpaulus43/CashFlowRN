export default class BoardModel {
  private totalPositions = 20;
  private playerPosition: { [playerId: string]: number } = {};

  addPlayer(playerId: string) {
    this.playerPosition[playerId] = 0;
  }

  updatePlayerPositionByN(playerId: string, n: number) {
    this.playerPosition[playerId] =
      (this.playerPosition[playerId] + n) % this.totalPositions;
  }

  getPositionForPlayer(playerId: string): number {
    return this.playerPosition[playerId];
  }
}
