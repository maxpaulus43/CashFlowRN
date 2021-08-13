import { PropertyType } from "./Asset";
import Card from "./Card";

// todo make "your business improves" card
export default class SellAssetCard extends Card {
  assetType: PropertyType
  offerAmount: number;

  constructor(title: string, text: string, assetType: PropertyType, offerAmount: number) {
    super(title, text);
    this.assetType = assetType;
    this.offerAmount = offerAmount;
  }
}
