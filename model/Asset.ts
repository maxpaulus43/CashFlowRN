export enum AssetType {
  Stock = "Stock",
  Property = "Property",
  Company = "Company",
}

export default abstract class Asset {
  id: string; // for stock type assets, this wil be the ticker symbol
  type: AssetType;
  description?: string;
  cost: number;
  cashFlow: number;

  constructor(
    id: string,
    type: AssetType,
    cost: number,
    description: string,
    cashflow: number
  ) {
    this.id = id;
    this.type = type;
    this.cost = cost;
    this.description = description;
    this.cashFlow = cashflow;
  }
}

export class Stock extends Asset {}

export enum PropertyType {
  TwoBedTwoBath = "TwoBedTwoBath",
  TwoBedOneBath = "TwoBedOneBath",
  ThreeBedTwoBath = "ThreeBedTwoBath",
  AllPlex = "AllPlex",
  Duplex = "Duplex",
  FourPlex = "FourPlex",
  EightPlex = "EightPlex",
  Company = "Company",
  GoldCoin = "GoldCoin",
  AptBuilding = "AptBuilding",
}

export class Property extends Asset {
  downPayment: number;
  propertyType: PropertyType;
  constructor(
    id: string,
    cost: number,
    description: string,
    cashflow: number,
    downPayment: number,
    propertyType: PropertyType
  ) {
    super(id, AssetType.Property, cost, description, cashflow);
    this.downPayment = downPayment;
    this.propertyType = propertyType;
  }
}
