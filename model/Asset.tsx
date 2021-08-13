export enum PropertyType {
  TwoBedTwoBath,
  TwoBedOneBath,
  AllPlex,
  TwoPlex,
  FourPlex,
  EightPlex,
  Company,
  GoldCoin,
}

export default abstract class Asset {
  id: string; // for stock type assets, this wil be the ticker symbol
  description: string;
  cost: number;
  cashflow: number;

  constructor(id: string, cost: number, description: string, cashflow: number) {
    this.id = id;
    this.cost = cost;
    this.description = description;
    this.cashflow = cashflow;
  }
}

export class Stock extends Asset {}

export class Property extends Asset {
  downPayment: number;
  constructor(
    id: string,
    cost: number,
    description: string,
    cashflow: number,
    downPayment: number
  ) {
    super(id, cost, description, cashflow);
    this.downPayment = downPayment;
  }
}
