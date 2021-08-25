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
  loseHandler?: (loser: Player) => void;
  private _donationDice: number = 0;
  public get donationDice(): number {
    return this._donationDice;
  }

  private stocks: [s: Stock, count: number][] = [];
  readonly stockPriceCount: {
    [stockId: string]: { [atPrice: string]: number };
  } = {};

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
    this.checkLoseCondition();
  }

  getPaid() {
    this.giveCash(this.paydayAmount());
    this.checkLoseCondition();
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
    for (const [s, count] of this.stocks) {
      sum += s.cashFlow * count;
    }
    for (const p of this.properties) {
      sum += p.cashFlow;
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

  otherExpenses() {
    return this.numberOfKids * this.expensesPerKid;
  }

  flattenedStockPriceCount(): [
    stockId: string,
    price: number,
    count: number
  ][] {
    let result: [string, number, number][] = [];
    
    for (const stockId in this.stockPriceCount) {
      for (const atPrice in this.stockPriceCount[stockId]) {
        const count = this.stockPriceCount[stockId][atPrice];
        result.push([stockId, parseInt(atPrice), count]);
      }
    }
    return result;
  }

  totalIncome() {
    return this.salary + this.passiveIncome();
  }

  paydayAmount() {
    return this.totalIncome() - this.expenses();
  }

  getDividendStocks() {
    return this.stocks.filter(([s, _]) => s.cashFlow > 0);
  }

  getStocksForId(stockId: string): [stock: Stock | undefined, count: number] {
    for (const item of this.stocks) {
      if (item[0].id === stockId) {
        return item;
      }
    }
    return [undefined, 0];
  }

  buyStockAmount(s: Stock, amount: number) {
    this.takeCash(s.cost * amount);

    let doesAlreadyOwnStock = false;
    for (const item of this.stocks) {
      const stockId = item[0].id;
      if (stockId === s.id) {
        doesAlreadyOwnStock = true;
        item[1] += amount;
        const oldAmount = this.stockPriceCount[stockId][s.cost] ?? 0;
        this.stockPriceCount[stockId][s.cost] = oldAmount + amount;
        break;
      }
    }

    if (!doesAlreadyOwnStock) {
      this.stocks.push([s, amount]);
      this.stockPriceCount[s.id] = {};
      this.stockPriceCount[s.id][s.cost] = amount;
    }

    this.checkWinCondition();
  }

  sellStockAmount(s: Stock, amount: number) {
    this.giveCash(s.cost * amount);

    for (let i = 0; i < this.stocks.length; i++) {
      const stockCount = this.stocks[i];
      const stockId = stockCount[0].id;

      if (stockId === s.id) {
        stockCount[1] -= amount;
        if (stockCount[1] <= 0) {
          this.stocks.splice(i, 1);
          delete this.stockPriceCount[s.id];
        } else {
          let stockPriceCount = this.stockPriceCount[s.id];
          let sortedPrices = Object.entries(stockPriceCount)
            .map(([p, amountOfP]) => [parseInt(p), amountOfP])
            .sort((a, b) => a[0] - b[0]);

          for (const [p, amountOfP] of sortedPrices) {
            if (amountOfP > amount) {
              this.stockPriceCount[s.id][p] = amountOfP - amount;
              break;
            } else {
              delete this.stockPriceCount[s.id][p];
              amount -= amountOfP;
            }
          }
        }

        break;
      }
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
    this.takeCash(amount);
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

  private checkLoseCondition() {
    if (this._cash < 0 && this.loseHandler) {
      this.loseHandler(this);
    }
  }
}
