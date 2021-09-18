import { Property, PropertyType, Stock } from ".";
import Liability from "./Liability";

type CostBasis = { [atPrice: number]: number };

type StockData = {
  [stockId: string]: {
    cashFlow: number;
    costBasis: CostBasis;
  };
};
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

  private stocks: StockData = {};

  private _properties: Property[] = [];
  public get properties(): Property[] {
    return this._properties;
  }

  private _liabilities: { [id: string]: Liability } = {};
  public get liabilities(): Liability[] {
    return Object.values(this._liabilities);
  }

  constructor(
    name: string,
    cash: number,
    salary: number,
    taxExpenses: number,
    expensesPerKid: number,
    occupation: string
  ) {
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
    this.checkLoseConditions();
  }

  getPaid() {
    this.giveCash(this.paydayAmount());
    this.checkLoseConditions();
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
    for (const stockId in this.stocks) {
      const count = this.amountOfStockForId(stockId);
      sum += this.stocks[stockId].cashFlow * count;
    }
    for (const p of this.properties) {
      sum += p.cashFlow;
    }
    return sum;
  }

  amountOfStockForId(stockId: string) {
    if (!(stockId in this.stocks)) {
      return 0;
    }

    return Object.values(this.stocks[stockId].costBasis).reduce(
      (sum, curr) => sum + curr,
      0
    );
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
    for (const stockId in this.stocks) {
      for (const atPrice in this.stocks[stockId].costBasis) {
        const count = this.stocks[stockId].costBasis[atPrice];
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

  getDividendStocks(): [stockId: string, cashFlow: number, count: number][] {
    return Object.entries(this.stocks)
      .filter(([_, data]) => {
        return data.cashFlow > 0;
      })
      .map(([stockId, data]) => {
        return [stockId, data.cashFlow, this.amountOfStockForId(stockId)];
      });
  }

  splitStock(stockId: string, splitFrom: number, splitTo: number) {
    if (!(stockId in this.stocks)) {
      return;
    }
    const costBasis = this.stocks[stockId].costBasis;
    for (const atPrice in costBasis) {
      costBasis[atPrice] = Math.ceil(
        costBasis[atPrice] * (splitTo / splitFrom)
      );
    }
    this.checkWinCondition();
  }

  buyStockAmount(s: Stock, amount: number) {
    this.takeCash(s.cost * amount);
    this.addStockAmount(s, amount);
    this.checkWinCondition();
  }

  sellStockAmount(s: Stock, amount: number) {
    this.giveCash(s.cost * amount);
    this.removeStockAmount(s, amount);
  }

  doesAlreadyOwnProperty(propertyId: string) {
    for (const p of this.properties) {
      if (p.id === propertyId) {
        return true;
      }
    }
    return false;
  }

  buyProperty(property: Property) {
    this.takeCash(property.downPayment);
    this.properties.push(property);
    this.checkWinCondition();
  }

  sellPropertyForAmount(propertyId: string, forAmount: number) {
    // todo optimize properties
    for (let i = 0; i < this.properties.length; i++) {
      const p = this.properties[i];
      if (propertyId === p.id) {
        this.giveCash(forAmount - (p.cost - p.downPayment));
        this.properties.splice(i, 1);
      }
    }
  }

  forecloseProperty(propertyId: string) {
    for (let i = 0; i < this.properties.length; i++) {
      const p = this.properties[i];
      if (propertyId === p.id) {
        this.giveCash(p.downPayment / 2); // todo maybe change foreclose logic
        this.properties.splice(i, 1);
      }
    }
  }

  ownsDamageableProperty() {
    const damageablePropertyTypes: PropertyType[] = [
      "TwoBedTwoBath",
      "TwoBedOneBath",
      "ThreeBedTwoBath",
      "ThreeBedThreeBath",
      "Duplex",
      "FourPlex",
      "EightPlex",
      "AptBuilding",
    ];
    return this._properties.some((p) =>
      damageablePropertyTypes.includes(p.type)
    );
  }

  improveProperty(propertyId: string, amount: number) {
    for (const p of this.properties) {
      if (p.id === propertyId) {
        p.cashFlow += amount;
        break;
      }
    }
    this.checkWinCondition();
  }

  addLiabiliy(l: Liability) {
    if (l.id in this._liabilities) {
      this._liabilities[l.id].increaseDebt(l.debtAmount);
    } else {
      this._liabilities[l.id] = l;
    }
  }

  getLiabilityForId(id: string): Liability | undefined {
    return id in this._liabilities ? this._liabilities[id] : undefined;
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

  saveData() {
    return {
      id: this.id,
      name: this.name,
      cash: this.cash,
      salary: this.salary,
      taxExpenses: this.taxExpenses,
      numberOfKids: this.numberOfKids,
      expensesPerKid: this.expensesPerKid,
      occupation: this.occupation,
      didRoll: this.didRoll,
      donationDice: this.donationDice,
      stockData: this.stocks,
      properties: this.properties,
      liabilities: this.liabilities.map((l) => l.saveData()),
    };
  }

  static fromSaveData(d: any) {
    let {
      id,
      name,
      cash,
      salary,
      taxExpenses,
      numberOfKids,
      expensesPerKid,
      occupation,
      didRoll,
      donationDice,
      stockData,
      properties,
      liabilities,
    } = d;
    let p = new Player(
      name,
      cash,
      salary,
      taxExpenses,
      expensesPerKid,
      occupation
    );
    p.numberOfKids = numberOfKids;
    p.didRoll = didRoll;
    p._donationDice = donationDice;
    p.stocks = stockData ?? {};
    p._properties = properties;
    liabilities
      .map((l: any) => Liability.fromSaveData(l))
      .forEach((l: Liability) => {
        p._liabilities[l.id] = l;
      });
    return p;
  }

  private checkWinCondition() {
    if (this.passiveIncome() > this.expenses()) {
      if (this.winHandler) {
        this.winHandler(this);
      }
    }
  }

  private getTotalStockAssetValue(): number {
    return Object.values(this.stocks)
      .map(({ costBasis }) =>
        Object.entries(costBasis).reduce((s, [atPrice, amount]) => {
          return s + parseInt(atPrice) * amount;
        }, 0)
      )
      .reduce((s, curr) => s + curr, 0);
  }

  private getTotalPropertyAssetValue(): number {
    return this.properties.reduce((s, p) => s + p.cost, 0);
  }

  isBankruptButCanRecover() {
    const totalSellablePropertyValue = this.getTotalPropertyAssetValue() / 2;
    const totalSellableStockValue = this.getTotalStockAssetValue() / 2;
    const totalAssetValue =
      totalSellablePropertyValue + totalSellableStockValue;
    return this._cash < 0 && totalAssetValue > Math.abs(this._cash);
  }

  private checkLoseConditions() {
    if (this._cash < 0 && !this.isBankruptButCanRecover()) {
      if (this.loseHandler) {
        this.loseHandler(this);
      }
    }
  }

  private addStockAmount(s: Stock, amount: number) {
    if (s.id in this.stocks) {
      const costBasis = this.stocks[s.id].costBasis;
      const oldAmount = costBasis[s.cost] ?? 0;
      costBasis[s.cost] = oldAmount + amount;
    } else {
      this.stocks[s.id] = { cashFlow: s.cashFlow, costBasis: {} };
      this.stocks[s.id].costBasis[s.cost] = amount;
    }
    this.checkWinCondition();
  }

  private removeStockAmount(s: Stock, amount: number) {
    if (!(s.id in this.stocks)) {
      return;
    }

    const costBasis = this.stocks[s.id].costBasis;

    const sortedCostBasis = Object.entries(costBasis)
      .map(([p, amountAtP]) => [parseInt(p), amountAtP])
      .sort(([priceA, _], [priceB, __]) => priceA - priceB);

    for (const [p, amountOfP] of sortedCostBasis) {
      if (amountOfP > amount) {
        costBasis[p] = amountOfP - amount;
        break;
      } else {
        delete costBasis[p];
        amount -= amountOfP;
      }
    }

    if (Object.keys(costBasis).length <= 0) {
      delete this.stocks[s.id];
    }
  }
}
