import React from "react";
import { ScrollView, Text, View, StyleSheet, ViewProps } from "react-native";
import Player from "../model/Player";
import ProgressBar from "./ProgressBar";
import Table from "./Table";

interface BalanceSheetProps {
  forPlayer: Player;
}

const H1: React.FC = ({ children }) => (
  <View style={{ backgroundColor: "rebeccapurple", padding: 2 }}>
    <Text style={{ fontSize: 20, color: "white" }}>{children}</Text>
  </View>
);

const H3: React.FC = ({ children }) => (
  <Text style={{ fontSize: 15, fontWeight: "bold" }}>{children}</Text>
);

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: p }) => {
  const expenses = p.expenses();

  const generalData = [
    ["Cash", p.cash],
    ["Total Income", p.totalIncome()],
    ["Total Expenses", expenses],
    ["PayDay", p.paydayAmount()],
  ];
  const expensesData = [
    ["Taxes", p.taxExpenses],
    ["Other", p.otherExpenses()],
  ].concat(p.liabilities.map((l) => [l.name, l.debtAmount]));
  const dividendsIncomeData = p
    .getDividendStocks()
    .map(([s]) => [s.id, s.cashFlow]);
  const realEstateIncomeData = p.properties.map((p) => [p.id, p.cashFlow]);
  const stockAssetData = p
    .flattenedStockPriceCount()
    .map(([stockId, price, count]) => {
      return [`${count} shares of ${stockId}`, price];
    });
  const realEstateAssetData = p.properties.map((p) => [p.id, p.cost]);
  const liabilitiesData = p.liabilities.map((l) => [l.id, l.debtAmount]);

  return (
    <View style={{ padding: 10, backgroundColor: "beige" }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        <View style={styles.box}>
          <Text>Total Expenses: {expenses}</Text>
          <ProgressBar
            progress={p.passiveIncome() / expenses}
            progressLabel={`Passive Income: ${p.passiveIncome()}`}
          />
        </View>

        <View style={styles.box}>
          <Table data={generalData} />
        </View>

        <View style={styles.box}>
          <H1>Income</H1>
          <Table data={[["Salary", p.salary]]} />

          <H3>Interest/Dividends</H3>
          <Table data={dividendsIncomeData} />

          <H3>Real Estate/Business</H3>
          <Table data={realEstateIncomeData} />
        </View>

        <View style={styles.box}>
          <H1>Expenses</H1>
          <Table data={expensesData} />
        </View>

        <View style={styles.box}>
          <H1>Assets</H1>

          <H3>Stocks/Funds/CDs</H3>
          <Table data={stockAssetData} />

          <H3>Real Estate/ Business</H3>
          <Table data={realEstateAssetData} />
        </View>

        <View style={styles.box}>
          <H1>Liabilities</H1>
          <Table data={liabilitiesData} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 5,
    marginTop: 6,
    backgroundColor: "white",
    shadowColor: "tan",
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
});

export default BalanceSheet;
