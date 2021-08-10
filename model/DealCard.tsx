import Asset from "./Asset";
import Card from "./Card";

export default class DealCard extends Card {
  asset: Asset;

  constructor(title: string, text: string, asset: Asset) {
    super(title, text);
    this.asset = asset;
  }
}
