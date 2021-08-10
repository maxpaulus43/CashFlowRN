import Asset, { AssetType } from "./Asset";
import Card from "./Card";
import DealCard from "./DealCard";
import LoseMoneyCard from "./LoseMoneyCard";
import SellAssetCard from "./SellAssetCard";

export default class Deck<T extends Card> {
  cards: T[];

  static makeBigDealDeck(): Deck<DealCard> {
    const cards = [
      new DealCard(
        "BIG DEAL baby",
        "you should buy this big deal",
        new Asset(AssetType.REAL_ESTATE_OR_BUSINESS, 1000, 800)
      ),
    ];
    const d = new Deck(cards);
    return d;
  }

  static makeSmallDealDeck(): Deck<DealCard> {
    const cards = [
      new DealCard(
        "best deal ever",
        "you should but this",
        new Asset(AssetType.STOCK_OR_FUND_OR_CD, 10, 0)
      ),
    ];
    const d = new Deck(cards);
    return d;
  }

  static makeSellAssetDeck(): Deck<SellAssetCard> {
    const cards = [
      new SellAssetCard(
        "best asset ever",
        "you should sell!",
        "this asset is a beast"
      ),
    ];
    const d = new Deck(cards);
    return d;
  }
  static makeLoseMoneyDeck(): Deck<LoseMoneyCard> {
    const cards = [new LoseMoneyCard("You lose", "you should pay this", 100)];
    const d = new Deck(cards);
    return d;
  }

  constructor(cards: T[]) {
    this.cards = cards;
    this.shuffle();
  }

  hasCards() {
      return this.cards.length > 0;
  }

  drawCard(): T | undefined {
    return this.cards.pop();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
