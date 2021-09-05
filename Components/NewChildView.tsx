import React from "react";
import { View, Text } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";

interface NewChildViewProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const NewChildView: React.FC<NewChildViewProps> = ({
  forPlayer: p,
  onDismiss,
}) => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>
        Congrats! You had a new Child! Your expenses have increased by{" "}
        {p.expensesPerKid.toLocaleString()}
      </Text>
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