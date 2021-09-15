import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Player } from "../model";
import Btn from "./Btn";
import Txt from "./Txt";

interface BankruptProps {
  forPlayer: Player;
  onDismiss: () => void;
}

const Bankrupt: React.FC<BankruptProps> = ({ forPlayer: p, onDismiss }) => {
  const [propertyToSell, setPropertyToSell] = useState<string>(
    p.properties[0]?.id
  );
  return (
    <View>
      <Txt>
        You have gone bankrupt. Sell your assets at half price until you can pay
        your debts.
      </Txt>
      {propertyToSell && (
        <>
          <Txt>Pick Some properties to sell AT HALF PRICE</Txt>
          <Picker
            selectedValue={propertyToSell}
            itemStyle={{ height: 100 }}
            onValueChange={(v) => setPropertyToSell(v)}
          >
            {p.properties.map((p) => {
              return <Picker.Item key={p.id} label={p.id} value={p.id} />;
            })}
          </Picker>
          <Btn
            title="Sell Property"
            onPress={() => {
              p.forecloseProperty(propertyToSell);
              setPropertyToSell(p.properties[0]?.id);
            }}
          />
        </>
      )}

      <Btn title="Done" disabled={p.isBankruptButCanRecover()} onPress={onDismiss} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Bankrupt;
