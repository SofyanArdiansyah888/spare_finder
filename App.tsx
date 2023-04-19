import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SpareList from "./src/screen/SpareList";
import SpareDetail from "./src/screen/SpareDetail";
import { StatusBar, Text } from "react-native";
import SparePart from "model/SparePart";

export type RootStackParamList = {
  SpareList: undefined;
  SpareDetail: { sparepart: SparePart };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"black"} />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="SpareList">
          <Stack.Screen
            name="SpareList"
            component={SpareList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SpareDetail"
            component={SpareDetail}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
