import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationParams } from "./NavigationParams";

import { Colors } from "../constants/Color";

const Stack = createStackNavigator<NavigationParams>();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
};

export default function App() {
  return <Stack.Navigator screenOptions={defaultNavOptions}></Stack.Navigator>;
}
