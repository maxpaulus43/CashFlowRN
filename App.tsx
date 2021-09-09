import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Game, Home, NewGame, Settings } from "./screens";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="New Game" component={NewGame} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

export default App;
