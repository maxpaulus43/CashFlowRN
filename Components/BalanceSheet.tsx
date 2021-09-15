import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Player } from "../model";
import ProgressBar from "./ProgressBar";
import Table from "./Table";
import Txt from "./Txt";

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
    <Txt style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
      {children}
    </Txt>
  </View>
);

const H3: React.FC<{ children: ReactNode; noBorder?: boolean }> = ({
  children,
  noBorder = false,
}) => (
  <View style={{ borderTopColor: "gray", borderTopWidth: noBorder ? 0 : 1 }}>
    <Txt style={{ fontSize: 15, fontWeight: "bold" }}>{children}</Txt>
  </View>
);

const BalanceSheet: React.FC<BalanceSheetProps> = ({ forPlayer: p }) => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets();

  const expenses = p.expenses();

  const generalData = [
    ["Cash", p.cash.toLocaleString()],
    ["Total Income", p.totalIncome().toLocaleString()],
    ["Total Expenses", expenses.toLocaleString()],
    ["PayDay", p.paydayAmount().toLocaleString()],
  ];
  const expensesData = [
    ["Taxes", p.taxExpenses.toLocaleString()],
    ["Other", p.otherExpenses().toLocaleString()],
  ].concat(
    p.liabilities.map((l) => [l.name, l.expenseAmount().toLocaleString()])
  );
  const dividendsIncomeData = p
    .getDividendStocks()
    .map(([stockId, cashFlow, count]) => [stockId, cashFlow * count]);
  const realEstateIncomeData = p.properties.map((p) => [p.id, p.cashFlow]);
  const stockAssetData = p
    .flattenedStockPriceCount()
    .map(([stockId, price, count]) => {
      return [`${count} shares of ${stockId}`, price];
    });
  const realEstateAssetData = p.properties.map((p) => [p.id, p.cost.toLocaleString()]);
  const liabilitiesData = p.liabilities.map((l) => [l.id, l.debtAmount.toLocaleString()]);
  const realEstateLiabilitiesData = p.properties.map(p => [p.id, (p.cost - p.downPayment).toLocaleString()])

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: paddingBottom + paddingTop, // give extra padding just cuz
        paddingTop,
      }}
    >
      <Txt style={{ textAlign: "center", fontSize: 30 }}>Balance Sheet 📋</Txt>

      <View style={styles.box}>
        <View style={{ alignItems: "flex-end" }}>
          <Txt>Total Expenses: {expenses.toLocaleString()}</Txt>
        </View>
        <ProgressBar
          progress={p.passiveIncome() / expenses}
          progressLabel={`Passive Income: ${p
            .passiveIncome()
            .toLocaleString()}`}
        />
      </View>

      <View style={styles.box}>
        <Table data={generalData} />
      </View>

      <View style={styles.box}>
        <H1>Income</H1>
        <Table data={[["Salary", p.salary.toLocaleString()]]} />

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

        <H3>Real Estate/Business</H3>
        <Table data={realEstateLiabilitiesData} />
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
