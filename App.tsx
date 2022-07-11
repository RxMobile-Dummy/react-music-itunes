import "./src/network/firebase_auth";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import Navigation from "./src/navigation";
import { store } from "./src/redux";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    RalewayLight: require("./assets/fonts/Raleway-Light.ttf"),
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"),
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"),
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
