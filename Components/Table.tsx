import React from "react";
import { View, ViewProps, Text } from "react-native";

interface TableProps extends ViewProps {
  data: (string | number)[][];
}

const Table: React.FC<TableProps> = ({ data: rows, style }) => (
  <View style={[style, { minHeight: rows.length > 0 ? 0 : 30 }]}>
    {rows.map((cols, idx) => {
      return (
        <Row
          style={{
            borderTopWidth: idx === 0 ? 0 : 1,
            borderTopColor: "wheat",
          }}
        >
          {cols.map((c) => (
            <Text>{c}</Text>
          ))}
        </Row>
      );
    })}
  </View>
);

const Row: React.FC<ViewProps> = ({ children, style }) => (
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
