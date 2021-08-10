import Asset from "./Asset";
import Liability from "./Liability";

export default class Player {
  readonly id: string;
  readonly name: string;
  private _cash: number;
  public get cash(): number {
    return this._cash;
  }
  readonly salary: number;
  assets: Asset[] = [];
  liabilities: Liability[] = [];
  readonly taxExpenses: number;
  private numberOfKids: number = 0;
  readonly expensesPerKid: number;
  readonly occupation: string;
  didRoll: boolean = false;
  winHandler?: (winner: Player) => void;

  constructor(
    name: string,
    cash: number,
    salary: number,
    taxExpenses: number,
    expensesPerKid: number,
    occupation: string
  ) {
    // todo random id
    this.id = name;
    this.name = name;
    this._cash = cash;
    this.salary = salary;
    this.taxExpenses = taxExpenses;
    this.expensesPerKid = expensesPerKid;
    this.occupation = occupation;
  }

  giveCash(amount: number) {
    this._cash += amount;
  }

  getPaid() {
    console.log("got paid");
    this.giveCash(this.paydayAmount());
  }

  addKid() {
    this.numberOfKids += 1;
  }

  borrowMoneyAmount(amount: number) {
    this._cash += amount;
  }

  passiveIncome() {
    let sum = 0;
    for (let a of this.assets) {
      sum += a.cashflow;
    }
    return sum;
  }

  expenses() {
    let sum = 0;
    for (let l of this.liabilities) {
      sum += l.expenseAmount();
    }
    sum += this.taxExpenses;
    sum += this.numberOfKids * this.expensesPerKid;
    return sum;
  }

  totalIncome() {
    return this.salary + this.passiveIncome();
  }

  paydayAmount() {
    return this.totalIncome() - this.expenses();
  }

  addAsset(a: Asset) {
    this.assets.push(a);
    this.checkWinCondition();
  }

  removeAsset(a: Asset) {
    // todo
  }

  addLiabiliy(l: Liability) {
    this.liabilities.push(l);
  }

  removeLiability(l: Liability) {
    // todo
    this.checkWinCondition();
  }

  private checkWinCondition() {
    if (this.passiveIncome > this.expenses) {
      if (this.winHandler) {
        this.winHandler(this);
      }
    }
  }
}
