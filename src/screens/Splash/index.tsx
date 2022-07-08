import { View, SafeAreaView, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Images } from "../../../assets/images";

interface Props {
  navigation?: any;
}

const Splash: React.FC<Props> = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    _goToIntroScreen();
  }, []);

  // To animate the splash logo,
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, []);

  //Navigate to Into screen
  function _goToIntroScreen() {
    setTimeout(() => {
      //   navigation.navigate("Home");
      // }, 1000);
      navigation.navigate("Intro");
    }, 2000);
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Image
            source={Images.SplashImg}
            style={[styles.muzikImg]}
            resizeMode={"contain"}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
