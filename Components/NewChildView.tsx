import React from "react";
import { View} from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
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
    <View>
      <Txt style={{ textAlign: "center" }}>
        Congrats! You had a new Child! Your expenses have increased by{" "}
        {p.expensesPerKid.toLocaleString()}
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
