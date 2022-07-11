import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationParams } from "./NavigationParams";

import { Colors } from "../constants/Color";
import Splash from "../screens/Splash";
import HomeScreen from "../screens/home";
import IntroScreen from "../screens/Intro";
import MusicDetail from "../screens/MusicDetail";
import MusicPlayer from '../screens/MusicPlayer';
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

      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="MusicDetail" component={MusicDetail} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} options={{
        headerShown: false,
      }} />
    </Stack.Navigator>
  );
}
