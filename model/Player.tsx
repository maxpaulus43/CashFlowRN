import Asset from "./Asset";
import Liability from "./Liability";

export default class Player {
  readonly id: string;
  readonly name: string;
  readonly cash: number;
  readonly income: number;
  readonly expenses: number;
  readonly assets: Asset[];
  readonly liabilities: Liability[];
  readonly occupation: string;
  readonly passiveIncome: number;
  didRoll: boolean;

  constructor(
    name: string,
    cash: number,
    income: number,
    expenses: number,
    occupation: string,
    assets: Asset[] = [],
    liabilities: Liability[] = []
  ) {
    this.id = name;
    this.name = name;
    this.cash = cash;
    this.income = income;
    this.expenses = expenses;
    this.occupation = occupation;
    this.assets = assets;
    this.liabilities = liabilities;
    this.passiveIncome = 0;
    this.didRoll = false;
  }

  rollDice(): number {
    const n = Math.ceil(Math.random() * 6);
    this.didRoll = true;
    return n;
  }
}
