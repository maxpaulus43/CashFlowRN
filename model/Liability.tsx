export default class Liability {
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
    this.name = name;
    this.debtAmount = debtAmount;
    this.expenseName = expenseName;
    this.interest = interest;
  }

  public expenseAmount(): number {
    return this.debtAmount * this.interest;
  }
}
