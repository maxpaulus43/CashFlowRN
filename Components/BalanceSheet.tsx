import React, { ReactNode } from "react";
import {  Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Player } from "../model";
import ProgressBar from "./ProgressBar";
import Table from "./Table";

interface BalanceSheetProps {
  forPlayer: Player;
}

const H1: React.FC = ({ children }) => (
  <View
    style={{
      backgroundColor: "rebeccapurple",
      padding: 5,
      paddingLeft: 10,
      margin: -5,
      marginBottom: 5,
    }}
  >
    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
      {children}
    </Text>
  </View>
);

const H3: React.FC<{ children: ReactNode; noBorder?: boolean }> = ({
  children,
  noBorder = false,
}) => (
  <View style={{ borderTopColor: "gray", borderTopWidth: noBorder ? 0 : 1 }}>
    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{children}</Text>
  </View>
);

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: p }) => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets();

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
  ].concat(p.liabilities.map((l) => [l.name, l.expenseAmount()]));
  const dividendsIncomeData = p
    .getDividendStocks()
    .map(([stockId, cashFlow, count]) => [stockId, cashFlow * count]);
  const realEstateIncomeData = p.properties.map((p) => [p.id, p.cashFlow]);
  const stockAssetData = p
    .flattenedStockPriceCount()
    .map(([stockId, price, count]) => {
      return [`${count} shares of ${stockId}`, price];
    });
  const realEstateAssetData = p.properties.map((p) => [p.id, p.cost]);
  const liabilitiesData = p.liabilities.map((l) => [l.id, l.debtAmount]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: paddingBottom + paddingTop, // give extra padding just cuz
        paddingTop
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 30 }}>
        Balance Sheet 📋
      </Text>

      <View style={styles.box}>
        <View style={{ alignItems: "flex-end" }}>
          <Text>Total Expenses: {expenses}</Text>
        </View>
        <ProgressBar
          progress={Math.min(
            Math.max(0, p.passiveIncome() / expenses),
            expenses
          )}
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

        <H3 noBorder>Stocks/Funds/CDs</H3>
        <Table data={stockAssetData} />

        <H3>Real Estate/ Business</H3>
        <Table data={realEstateAssetData} />
      </View>

      <View style={styles.box}>
        <H1>Liabilities</H1>
        <Table data={liabilitiesData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  box: {
    padding: 5,
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
  },
});

export default BalanceSheet;
