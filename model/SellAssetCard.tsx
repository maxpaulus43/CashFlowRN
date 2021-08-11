import Asset, { AssetType } from "./Asset";
import Card from "./Card";

export default class SellAssetCard extends Card {
  asset: Asset;

  constructor(title: string, text: string, asset: Asset) {
    super(title, text);
    this.asset = asset;
  }
}
