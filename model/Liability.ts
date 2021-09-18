export default class Liability {
  id: string;
  name: string;
  debtAmount: number;
  expenseName: string;
  interest: number;

  constructor(
    name: string,
    debtAmount: number,
    expenseName: string,
    interest: number
  ) {
    this.id = name;
    this.name = name;
    this.debtAmount = debtAmount;
    this.expenseName = expenseName;
    this.interest = interest;
  }

  public expenseAmount(): number {
    return this.debtAmount * this.interest;
  }

  public decreaseDebt(byAmount: number) {
    this.debtAmount = Math.max(0, this.debtAmount - byAmount);
  }

  public increaseDebt(byAmount: number) {
    this.debtAmount += byAmount;
  }

  saveData() {
    return {
      id: this.id,
      name: this.name,
      debtAmount: this.debtAmount,
      expenseName: this.expenseName,
      interest: this.interest,
    };
  }

  static fromSaveData(d: any) {
    const { id, name, debtAmount, expenseName, interest } = d;
    const l = new Liability(name, debtAmount, expenseName, interest);
    return l;
  }
}
