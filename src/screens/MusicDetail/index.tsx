import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  Animated,
} from "react-native";
import { Colors } from "../../constants/Color";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { String } from "../../constants/String";
import moment from "moment";
import * as Linking from "expo-linking";

interface Props {
  route?: any;
  navigation?: any;
}

const MusicDetail: React.FC<Props> = ({ route, navigation }) => {
  const slideUpValue = new Animated.Value(0);
  const { musicDetail, podcast } = route.params;

  // Will start animation

  useEffect(() => {
    _start();
  }, []);

  //Animation view code

  const _start = () => {
    return Animated.parallel([
      Animated.timing(slideUpValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  function _setPlayUrl(item) {
    if (podcast) {
      navigation.navigate("MusicPlayer", {
        podcast: true,
        musicDetail: musicDetail,
      });
    } else {
      if (musicDetail.isStreamable === true) {
        Linking.openURL(item);
      } else {
        if (musicDetail.previewUrl.includes(".m4a")) {
          navigation.navigate("MusicPlayer", {
            musicPlayer: true,
            musicDetail: musicDetail,
          });
        } else {
          navigation.navigate("MusicPlayer", { musicDetail: musicDetail });
        }
      }
    }
  }

  // Will return detail view

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          opacity: slideUpValue,
          transform: [
            {
              scale: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        }}
      >
        <ImageBackground
          style={styles.musicImage}
          resizeMode={"stretch"}
          source={{
            uri: podcast
              ? musicDetail.artworkUrl600
              : musicDetail.artworkUrl100,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.backBtn}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>

          <View style={styles.txtVw}>
            <View style={styles.rgbVw}>
              <Text style={styles.collectionTxt}>
                {podcast ? String.Podcast : String.Artist}
              </Text>
              <Text style={styles.artstTxt}>
                {podcast ? musicDetail.collectionName : musicDetail.artistName}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.mainBottomVw}>
          <TouchableOpacity
            style={styles.dwnldBtn}
            onPress={() => {
              _setPlayUrl(
                podcast ? musicDetail.episodeUrl : musicDetail.previewUrl
              );
            }}
          >
            <Ionicons name="ios-play" size={40} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.mainTabVw}>
            <View style={styles.tabVw}>
              <Text style={styles.tabDetailTxt}>{String.FollowersTxt}</Text>
              <Text style={styles.tabTitleTxt}>{musicDetail.country}</Text>
            </View>
            <View style={styles.tabVw}>
              <Text style={styles.tabDetailTxt}>
                {podcast ? String.EpiPrice : String.FollowingTxt}
              </Text>
              <Text style={styles.tabTitleTxt}>
                ${musicDetail.trackPrice ? musicDetail.trackPrice : "0"}
              </Text>
            </View>
          </View>
          <Text style={styles.albumTxt}>
            {podcast ? String.Episode : String.Albums}
          </Text>
          <View style={styles.mainCardView}>
            <Image
              source={{
                uri: podcast
                  ? musicDetail.artworkUrl600
                  : musicDetail.artworkUrl100,
              }}
              style={styles.artImg}
              resizeMode={"cover"}
            />
            <View style={styles.cardTxtVw}>
              <Text style={styles.cardTitleTxt}>
                {podcast ? musicDetail.trackName : musicDetail.collectionName}
              </Text>
              <Text style={styles.yrTxt}>
                {moment(musicDetail.releaseDate).format("YYYY")}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default MusicDetail;
