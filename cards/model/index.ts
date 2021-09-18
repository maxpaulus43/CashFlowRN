export { default as Game } from "./Game";
export { default as Deck } from "./Deck";
export { default as Player } from "./Player";
export { default as Liability } from "./Liability";
export { default as Board } from "./Board";

export type PropertyType =
  | "TwoBedTwoBath"
  | "TwoBedOneBath"
  | "ThreeBedTwoBath"
  | "ThreeBedThreeBath"
  | "Duplex"
  | "FourPlex"
  | "EightPlex"
  | "Company"
  | "GoldCoin"
  | "AptBuilding"
  | "Land"
  | "Misc";

export interface Property {
  id: string;
  type: PropertyType;
  cost: number;
  cashFlow: number;
  downPayment: number;
}

export interface Stock {
  id: string;
  cost: number;
  cashFlow: number;
}

export interface StockSplit {
  id: string;
  splitFrom: number;
  splitTo: number;
}

export interface PropertyDamage {
  cost: number;
}

export interface Card {
  title: string;
  text: string;
}

export type DealType = "Stock" | "Property" | "StockSplit" | "PropertyDamage";

export interface DealCard extends Card {
  dealType: DealType;
  info: Stock | Property | StockSplit | PropertyDamage;
}

export interface Offer {
  id?: string;
  limit?: number;
  offerAmount: number;
}

export interface Improvement {
  id: string;
  incomeIncrease: number;
}

export type MarketType = PropertyType | "AllPlex" | "Improvement";

export interface MarketCard extends Card {
  type: MarketType;
  info: Offer | Improvement;
}

export interface LoseMoneyCard extends Card {
  cost: number;
}
