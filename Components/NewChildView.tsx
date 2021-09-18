import React from "react";
import { View, StyleSheet } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Price from "./Price";
import Txt from "./Txt";

interface NewChildViewProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const NewChildView: React.FC<NewChildViewProps> = ({
  forPlayer: p,
  onDismiss,
}) => {
  return (
    <View style={styles.card}>
      <Txt bold>New Child!</Txt>
      <View style={{ height: 15 }} />
      <Txt center>
        Congrats! You had a new Child! Your expenses have increased by
        <Price value={p.expensesPerKid} />
      </Txt>
      <View style={{ flex: 1 }} />
      <Btn
        title="Dismiss"
        onPress={() => {
          p.addKid();
          onDismiss();
        }}
      />
    </View>
  );
};

export default NewChildView;

const styles = StyleSheet.create({
  card: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
