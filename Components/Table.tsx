import React from "react";
import { View, ViewProps } from "react-native";
import Txt from "./Txt";

interface TableProps extends ViewProps {
  data: (string | number)[][];
}

const Table: React.FC<TableProps> = ({ data: rows, style }) => (
  <View style={[style, { minHeight: rows.length > 0 ? 0 : 30 }]}>
    {rows.map((cols, idx) => {
      return (
        <Row
          key={JSON.stringify(cols)}
          style={{
            borderTopWidth: idx === 0 ? 0 : 1,
            borderTopColor: "lightgray",
          }}
        >
          {cols.map((c) => (
            <Txt key={c}>{c}</Txt>
          ))}
        </Row>
      );
    })}
  </View>
);

export const Row: React.FC<ViewProps> = ({ children, style }) => (
  <View
    style={[
      {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      style,
    ]}
  >
    {children}
  </View>
);

export default Table;
