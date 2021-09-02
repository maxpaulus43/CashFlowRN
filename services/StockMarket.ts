export default class StockMarket {
  static tradingRangeForStock = {
    MYT4U: { lo: rnd(5, 15), hi: rnd(15, 40) },
    GRO4US: { lo: rnd(10, 30), hi: rnd(30, 60) },
  };

  static getPriceForStock(id: string) {
    return Math.ceil(Math.random() * 45);
  }
}

function rnd(from: number, to: number) {
  return from + Math.ceil(Math.random() * (to - from));
}
