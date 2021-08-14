import Card from "./Card";
import DealCard from "./DealCard";
import LoseMoneyCard from "./LoseMoneyCard";
import SellAssetCard from "./SellAssetCard";
import BigDealCardsData from "../cards/BigDealCards.json";
import SmallDealCardsData from "../cards/SmallDealCards.json";
import MarketCardsData from "../cards/MarketCards.json";
import LoseMoneyCardsData from "../cards/LoseMoneyCards.json";
import { AssetType } from "./Asset";
import StockMarket from "../services/StockMarket";

export default class Deck<T extends Card> {
  cards: T[];

  static makeBigDealDeck(): Deck<DealCard> {
    const cards = BigDealCardsData as DealCard[];
    return new Deck([...cards]);
  }

  static makeSmallDealDeck(): Deck<DealCard> {
    const cards = SmallDealCardsData as DealCard[];
    // randomize Stock prices
    cards
      .map((c) => c.asset)
      .filter((a) => a.type === AssetType.Stock)
      .forEach((stock) => {
        stock.cost = StockMarket.getPriceForStock(stock.id);
      });
    return new Deck([...cards]);
  }

  static makeSellAssetDeck(): Deck<SellAssetCard> {
    const cards = MarketCardsData as SellAssetCard[];
    return new Deck([...cards]);
  }

  static makeLoseMoneyDeck(): Deck<LoseMoneyCard> {
    const cards = LoseMoneyCardsData as LoseMoneyCard[];
    return new Deck([...cards]);
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
