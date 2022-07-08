import { View, SafeAreaView, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Images } from "../../../assets/images";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Utils from "../../utils/Utils";
const auth = getAuth();

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
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  //Navigate to Into or home screen
  function _goToIntroScreen() {
    setTimeout(async () => {
      const user = await Utils.isUser();
      if (user) {
        navigation.navigate("Home");
      } else {
        const isIntroOpened = await Utils.isIntoOpened();
        if (isIntroOpened) {
          navigation.navigate("SignIn");
        } else {
          navigation.navigate("Intro");
        }
      }
    }, 3000);
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
