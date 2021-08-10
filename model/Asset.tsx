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

export class StockFundCD extends Asset {
  tradingRangeLow: number;
  tradingRangeHigh: number;
  constructor(cost: number, tradingRangeLow: number, tradingRangeHigh: number) {
    super(AssetType.STOCK_OR_FUND_OR_CD, cost, 0);
    this.tradingRangeLow = tradingRangeLow;
    this.tradingRangeHigh = tradingRangeHigh;
  }
}

export class RealEstateOrBusiness extends Asset {
  constructor(cost: number, cashflow: number) {
    super(AssetType.REAL_ESTATE_OR_BUSINESS, cost, cashflow);
    this.cost = cost;
  }
}
