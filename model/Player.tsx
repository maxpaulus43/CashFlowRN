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
  private _donationDice: number = 0;
  public get donationDice(): number {
    return this._donationDice;
  }

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

  takeCash(amount: number) {
    this._cash -= amount;
  }

  getPaid() {
    this.giveCash(this.paydayAmount());
  }

  addDonationDice(n: number) {
    this._donationDice += n;
  }

  rollDice(): number {
    let n = Math.ceil(Math.random() * 6);
    if (this.donationDice > 0) {
      n += Math.ceil(Math.random() * 6);
      this._donationDice -= 1;
    }
    return n;
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

  payLiability(l: Liability, amount: number) {
    // todo pay liability
    if (false/* liability amount is 0 */) {
      this.removeLiability(l);
    }
  }

  private checkWinCondition() {
    if (this.passiveIncome() > this.expenses()) {
      if (this.winHandler) {
        this.winHandler(this);
      }
    }
  }
}
