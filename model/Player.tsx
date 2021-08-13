import DeepEqualsMap from "../utils/DeepEqualsMap";
import { Property, Stock } from "./Asset";
import Liability from "./Liability";

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

  private _stocks: DeepEqualsMap<Stock, number> = new DeepEqualsMap();
  public get stocks(): [s: Stock, count: number][] {
    return this._stocks.entries();
  }

  private _properties: Property[] = [];
  public get properties(): Property[] {
    return this._properties;
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
    for (const [s, count] of this._stocks.entries()) {
      sum += s.cashflow * count;
    }
    for (const p of this.properties) {
      sum += p.cashflow;
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

  buyStockAmount(s: Stock, amount: number) {
    this.takeCash(s.cost * amount);
    const currentAmount = this._stocks.get(s) ?? 0;
    const newAmount = currentAmount + amount;
    this._stocks.set(s, newAmount);
    this.checkWinCondition();
  }

  sellStockAmount(s: Stock, amount: number) {
    this.giveCash(s.cost * amount);
    const currentAmount = this._stocks.get(s) ?? 0;
    const newAmount = currentAmount - amount;
    if (newAmount < 0) {
      this._stocks.delete(s);
    } else {
      this._stocks.set(s, newAmount);
    }
  }

  buyProperty(property: Property) {
    this.takeCash(property.downPayment);
    this.properties.push(property);
    // possibly add a liability
    this.checkWinCondition();
  }

  sellPropertyForAmount(propertyId: string, forAmount: number) {
    // todo optimize sellPropertyForAmount
    this.giveCash(forAmount);
    for (let i = 0; i < this.properties.length; i++) {
      const p = this.properties[i];
      if (propertyId === p.id) {
        this.properties.splice(i, 1);
      }
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
