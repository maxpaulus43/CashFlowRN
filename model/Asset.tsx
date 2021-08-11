export enum AssetType {
  STOCK_OR_FUND_OR_CD,
  REAL_ESTATE_OR_BUSINESS,
}
export default class Asset {
  id: string; // for stock type assets, this wil be the ticker symbol
  type: AssetType;
  cost: number;
  downPay: number;
  description: string;
  cashflow: number;

  constructor(
    id: string,
    type: AssetType,
    cost: number,
    downPay: number,
    description: string,
    cashflow: number
  ) {
    this.id = id;
    this.type = type;
    this.cost = cost;
    this.downPay = downPay;
    this.description = description;
    this.cashflow = cashflow;
  }
}
