import { SafeAreaView, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Video, ResizeMode, Audio } from "expo-av";
import Header from "../../components/Header/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Color";

interface Props {
  route?: any;
  navigation?: any;
}
// Will return audio and video view as per requirement

const MusicPlayer: React.FC<Props> = ({ route, navigation }) => {
  const { musicDetail, podcast } = route.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [sound, setSound] = React.useState();

  //To play sound

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: musicDetail.episodeUrl,
    });
    setSound(sound);
    console.log("Playing Sound", sound);
    await sound.playAsync();
  }

  // Will stop sound, When user will be back

  React.useEffect(() => {
    console.log("musicDetail.previewUrl :: = ", musicDetail.previewUrl);
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title={podcast ? musicDetail.trackName : musicDetail.collectionName}
        backButton={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {podcast ? (
          <View style={{}}>
            <View style={styles.audioVw}>
              <Image
                source={{
                  uri: musicDetail.artworkUrl600,
                }}
                style={styles.artImg}
                resizeMode={"cover"}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.playBtn} onPress={playSound}>
                <Ionicons name={"ios-play"} size={40} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.videoVw}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: musicDetail.previewUrl,
              }}
              useNativeControls={true}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;
