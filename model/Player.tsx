import Asset from "./Asset";
import Card from "./Card";
import Liability from "./Liability";

export default class Player {
  readonly id: string;
  readonly name: string;
  private _cash: number;
  private _income: number;
  private _expenses: number;
  private assets: Asset[];
  private liabilities: Liability[];
  private occupation: string;
  private _passiveIncome: number;
  winHandler?: (winner: Player) => void;

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
    this._cash = cash;
    this._income = income;
    this._expenses = expenses;
    this.occupation = occupation;
    this.assets = assets;
    this.liabilities = liabilities;
    this._passiveIncome = 0;
    this.didRoll = false;
  }

  handleActionForCard(card: Card) {}

  borrowMoney(amount: number) {
    this._cash += amount;
    this.expenses += amount * 0.1;
  }

  private checkWinCondition() {
    if (this.passiveIncome > this.expenses) {
      if (this.winHandler) {
        this.winHandler(this);
      }
    }
  }

  get cash(): number {
    return this._cash;
  }
  public get income(): number {
    return this._income;
  }
  public get expenses(): number {
    return this._expenses;
  }
  public set expenses(value: number) {
    this._expenses = value;
    this.checkWinCondition();
  }
  public get passiveIncome(): number {
    return this._passiveIncome;
  }
  public set passiveIncome(value: number) {
    this._passiveIncome = value;
    this.checkWinCondition();
  }
}
