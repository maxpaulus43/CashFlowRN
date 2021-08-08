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

  handleActionForCard(card: Card) {
    
  }

  rollDice(): number {
    const n = Math.ceil(Math.random() * 6);
    this.didRoll = true;
    return n;
  }

  borrowMoney(amount: number) {
    this._cash += amount;
    this._expenses += amount * 0.1;
    this.liabilities // todo add something to liabilities
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
  public get passiveIncome(): number {
    return this._passiveIncome;
  }
}
