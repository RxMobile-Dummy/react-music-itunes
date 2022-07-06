import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationParams } from "./NavigationParams";

import { Colors } from "../constants/Color";
import Splash from "../screens/Splash";

const Stack = createStackNavigator<NavigationParams>();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
};

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
