export enum AssetType {
  STOCK_OR_FUND_OR_CD,
  REAL_ESTATE_OR_BUSINESS,
}
export default class Asset {
  type: AssetType;
  cost: number;
  cashflow: number;
  constructor(type: AssetType, cost: number, cashflow: number) {
    this.type = type;
    this.cost = cost;
    this.cashflow = cashflow;
  }
}
