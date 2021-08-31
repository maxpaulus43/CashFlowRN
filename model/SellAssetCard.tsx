import { PropertyType } from "./Asset";
import Card from "./Card";

// todo make "your business improves" card
export default class SellAssetCard extends Card {
  propertyType: PropertyType;
  offerAmount?: number;
  incomeIncrease?: number;

  constructor(
    title: string,
    text: string,
    assetType: PropertyType,
    offerAmount: number,
    incomeIncrease: number
  ) {
    super(title, text);
    this.propertyType = assetType;
    this.offerAmount = offerAmount;
    this.incomeIncrease = incomeIncrease;
  }
}
