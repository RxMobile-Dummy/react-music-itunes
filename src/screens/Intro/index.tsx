import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { Props } from "./IIntro";
import { Images } from "../../../assets/images";
import { Colors } from "../../constants/Color";
import AppButton from "../../components/button/AppButton";
import { String } from "../../constants/String";

//Introduction screen, called after the splash screen and will navigate to sign in screen from here

const IntroScreen: React.FC<Props> = ({ navigation }) => {
  const onPressGo = () => {
    navigation.navigate("Home");
  };

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");

  //To set the current swiped slide
  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollViewStyle}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
      >
        <View style={styles.page} key="1">
          <View style={styles.imageView}>
            <Image
              source={Images.IntroSlide2}
              style={styles.imageStyle}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.wrapper}>
            <Text
              style={[
                styles.header,
                {
                  color: Colors.slide1Color,
                },
              ]}
            >
              {String.inroTitle1}
            </Text>
          </View>
        </View>
        <View style={styles.page} key="2">
          <View style={styles.imageView}>
            <Image
              source={Images.IntroSlide3}
              style={styles.imageStyle}
              resizeMode="stretch"
            />
          </View>

          <View style={styles.wrapper}>
            <Text
              style={[
                styles.header,
                {
                  color: Colors.slide2Color,
                },
              ]}
            >
              {String.inroTitle2}
            </Text>
          </View>
        </View>
        <View style={styles.page} key="3">
          <View style={styles.imageView}>
            <Image
              source={Images.IntroSlide1}
              style={styles.imageStyle}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.wrapper}>
            <Text
              style={[
                styles.header,
                {
                  color: Colors.slide3Color,
                },
              ]}
            >
              {String.inroTitle3}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        <View style={{ flexDirection: "row" }}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {
                  backgroundColor:
                    pageIndex === index
                      ? pageIndex === 1
                        ? Colors.slide2Color
                        : pageIndex === 2
                          ? Colors.slide3Color
                          : Colors.slide1Color
                      : Colors.white,
                  width: pageIndex === index ? 40 : 8,
                },
              ]}
              key={index}
            />
          ))}
        </View>
        <AppButton
          containerStyle={{
            backgroundColor:
              pageIndex === 1
                ? Colors.slide2Color
                : pageIndex === 2
                  ? Colors.slide3Color
                  : Colors.slide1Color,
          }}
          onPress={onPressGo}
          text=""
        />
      </View>
    </SafeAreaView>
  );
};
export default IntroScreen;
