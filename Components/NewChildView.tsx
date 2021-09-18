import React from "react";
import { View } from "react-native";
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
    <View style={{justifyContent: "space-between"}}>
      <Txt style={{ textAlign: "center" }}>
        Congrats! You had a new Child! Your expenses have increased by
        <Price value={p.expensesPerKid} />
      </Txt>
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
