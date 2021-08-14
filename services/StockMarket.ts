export default class StockMarket {
    static getPriceForStock(id: string) {
        return Math.ceil(Math.random() * 45);
    }
}