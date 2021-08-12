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
}
