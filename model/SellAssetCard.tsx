import Card from "./Card";

export default class SellAssetCard extends Card {
  assetInfo: string;

  constructor(title: string, text: string, assetInfo: string) {
    super(title, text);
    this.assetInfo = assetInfo;
  }
}
