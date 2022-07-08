import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationParams } from "./NavigationParams";

import { Colors } from "../constants/Color";
import Splash from "../screens/Splash";
import HomeScreen from "../screens/home";
import IntroScreen from "../screens/Intro";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import { String } from "../constants/String";

import MusicDetail from "../screens/MusicDetail";
const Stack = createStackNavigator<NavigationParams>();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTintColor: Colors.primary,
};

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName={"Splash"}
    >
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
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
          title: String.SignUp,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MusicDetail"
        component={MusicDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
