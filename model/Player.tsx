import Asset from "./Asset";
import Liability from "./Liability";

interface AssetInfo {
  count: number;
  asset: Asset;
}
// interface LiabilityInfo {
//   count: number;
//   liability: Liability;
// }
export default class Player {
  readonly id: string;
  readonly name: string;
  private _cash: number;
  public get cash(): number {
    return this._cash;
  }
  readonly salary: number;
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

  private _assets: { [id: string]: AssetInfo } = {};
  public get assets(): Asset[] {
    return Object.keys(this._assets).map(
      (assetId) => this._assets[assetId].asset
    );
  }

  private _liabilities: { [id: string]: Liability } = {};
  public get liabilities(): Liability[] {
    return Object.keys(this._liabilities).map(
      (liabilityId) => this._liabilities[liabilityId]
    );
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
    this.giveCash(amount);
    this.addLiabiliy(new Liability("Loan", amount, "Loan Repayment", 0.1));
  }

  passiveIncome() {
    let sum = 0;
    for (const assetId in this._assets) {
      const { count, asset } = this._assets[assetId];
      for (let i = 0; i < count; i++) {
        sum += asset.cashflow;
      }
    }
    return sum;
  }

  expenses() {
    let sum = 0;
    for (const liabilityId in this._liabilities) {
      const l = this._liabilities[liabilityId];
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
    if (a.id in this._assets) {
      this._assets[a.id].count += 1;
    } else {
      this._assets[a.id] = { count: 1, asset: a };
    }
    this.checkWinCondition();
  }

  removeAsset(a: Asset) {
    if (this._assets[a.id]?.count > 1) {
      this._assets[a.id].count -= 1;
    } else {
      delete this._assets[a.id];
    }
  }

  addLiabiliy(l: Liability) {
    if (l.id in this._liabilities) {
      this._liabilities[l.id].increaseDebt(l.debtAmount);
    } else {
      this._liabilities[l.id] = l;
    }
  }

  payAmountForLiability(amount: number, liabilityId: string) {
    // assume that liabilityId already exists in the dict
    const l = this._liabilities[liabilityId];
    l.decreaseDebt(amount);
    if (l.debtAmount <= 0) {
      delete this._liabilities[liabilityId];
    }
    this.checkWinCondition();
  }

  private checkWinCondition() {
    if (this.passiveIncome() > this.expenses()) {
      if (this.winHandler) {
        this.winHandler(this);
      }
    }
  }
}
