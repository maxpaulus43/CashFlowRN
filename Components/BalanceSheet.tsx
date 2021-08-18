import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import Player from "../model/Player";

interface BalanceSheetProps {
  forPlayer: Player;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: p }) => {
  const expenses = p.expenses();
  return (
    <ScrollView
      style={{
        backgroundColor: "beige",
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={styles.paddedBorderBottom}>
        <Text>Total Expenses: {expenses}</Text>
        <Text>Passive Income: {p.passiveIncome()}</Text>
      </View>

      <View style={styles.paddedBorderBottom}>
        <Text>Cash: {p.cash}</Text>
        <Text>Total Income: {p.totalIncome()}</Text>
        <Text>Total Expenses: {expenses}</Text>
        <Text>Payday: {p.paydayAmount()}</Text>
      </View>

      <View style={styles.paddedBorderBottom}>
        <Text>Income</Text>
        <Text>Salary: {p.salary}</Text>
        <Text>Interest/Dividends</Text>
        {p.getDividendStocks().map(([s, _]) => (
          <Text key={s.id}>
            {s.id}: {s.cashFlow}
          </Text>
        ))}
        <Text>Real Estate/Business</Text>
        {p.properties.map((p) => (
          <Text key={p.id}>
            {p.id}: {p.cashFlow}
          </Text>
        ))}
      </View>

      <View style={styles.paddedBorderBottom}>
        <Text>Expenses</Text>
        {p.liabilities.map((l) => (
          <Text>{l.expenseName}: {l.expenseAmount()}</Text>
        ))}
        <Text>Taxes: {p.taxExpenses}</Text>
        <Text>Other Expenses (children, etc...): {p.otherExpenses()}</Text>
      </View>

      <View style={styles.paddedBorderBottom}>
        <Text>Assets</Text>
        <Text>Stocks/Funds/CDs</Text>
        {p.flattenedStockPriceCount().map(([stockId, atPrice, count]) => (
          <Text key={`${stockId}@${atPrice}`}>
            {count} Shares of {stockId}@{atPrice}
          </Text>
        ))}

        <Text>Real Estate/ Business</Text>
        {p.properties.map((p) => (
          <Text key={p.id}>
            {p.id}: {p.cost}
          </Text>
        ))}
      </View>

      <View style={styles.paddedBorderBottom}>
        <Text>Liabilities</Text>
        {p.liabilities.map((l) => (
          <Text key={l.id}>
            {l.name}: {l.debtAmount}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paddedBorderBottom: {
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default BalanceSheet;
