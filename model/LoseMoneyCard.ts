import Card from "./Card";

export default class LoseMoneyCard extends Card {
  cost: number;

  constructor(title: string, text: string, cost: number) {
    super(title, text);
    this.cost = cost;
  }
}
