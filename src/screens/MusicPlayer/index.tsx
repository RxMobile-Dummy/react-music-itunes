import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  Video,
  ResizeMode,
  Audio,
  InterruptionModeIOS,
  InterruptionModeAndroid,
} from "expo-av";
import Header from "../../components/Header/Header";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
import SeekBar from "../../components/player/SeekBar";
import { MaterialIcons } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";

import database, {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
} from "firebase/database";
import Utils from "../../utils/Utils";

interface Props {
  route?: any;
  navigation?: any;
}
// Will return audio and video view as per requirement

const MusicPlayer: React.FC<Props> = ({ route, navigation }) => {
  const { musicDetail, podcast } = route.params;

  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [previouslyPlay, setPreviouslyPlay] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setBuffering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);

  const [userId, setUserId] = useState("");
  const [isFavourite, setFavourite] = useState(false);

  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  //To play sound

  async function playSound() {
    console.log("Loading Sound");
    if (!playbackInstance) {
      // const { sound } = await Audio.Sound.createAsync({
      //   uri: musicDetail.episodeUrl,
      // });
      // console.log("Playing Sound", sound);
      // await sound.playAsync();
      // sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      // // await sound.loadAsync(musicDetail.episodeUrl, status, false);
      // setPlaybackInstance(sound);
      // setPlaying(true);
    } else {
      if (isPlaying) {
        await playbackInstance.pauseAsync();
        setPlaying(false);
      } else {
        await playbackInstance.playAsync();
        setPlaying(true);
      }
    }
  }

  //checking the playback on seekbar to show the track time
  const onPlaybackStatusUpdate = (status: any) => {
    // console.log('status updated');
    // console.log(status);
    if (status.isLoaded == true) {
      // console.log("status.durationMillis : ", status.durationMillis);
      // console.log("status.positionMillis : ", status.positionMillis);
      setTotalLength(status.durationMillis);
      setCurrentPosition(status.positionMillis);
    }
    setBuffering(status.buffering);
  };

  //action on track slider
  async function seek(value) {
    await playbackInstance.setPositionAsync(value);
    if (previouslyPlay) {
      await playbackInstance.playAsync();
      setPlaying(true);
      setPreviouslyPlay(false);
    }
  }

  //On slider change
  async function sliding() {
    // console.log('sliding');
    if (isPlaying) {
      await playbackInstance.pauseAsync();
      setPlaying(false);
      setPreviouslyPlay(true);
    }
  }

  // Will stop sound, When user will be back

  React.useEffect(() => {
    console.log("musicDetail.previewUrl :: = ", musicDetail.previewUrl);
    return playbackInstance
      ? () => {
          console.log("Unloading Sound");
          playbackInstance.unloadAsync();
        }
      : undefined;
  }, [playbackInstance]);

  useEffect(() => {
    async function configureAudio() {
      const data = await Utils.getUserData();
      setUserId(data.userId);
      getIsFavourite(musicDetail.trackId, data.userId);
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        loadAudio();
      } catch (e) {
        console.log(e);
      }
    }
    configureAudio();
  }, []);

  //Loading the current audio in player
  async function loadAudio() {
    const sound = new Audio.Sound();

    // const { sound } = await Audio.Sound.createAsync({
    //   uri: musicDetail.episodeUrl,
    // });
    const source = {
      uri: musicDetail.episodeUrl,
    };
    const status = {
      shouldPlay: isPlaying,
      volume,
    };
    // console.log("Playing Sound", sound);
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await sound.loadAsync(source, status, false);

    setPlaybackInstance(sound);
    // setPlaying(true);
  }

  //set and remove favourite from database
  function setOrRemoveFavorite(trackId: any) {
    const db = getDatabase();
    if (!isFavourite) {
      const reference = ref(db, "users/" + userId + "/favourite/" + trackId);
      set(reference, {
        isFavourite: true,
      });
    } else {
      const reference = ref(db, "users/" + userId + "/favourite/" + trackId);
      remove(reference);
    }
  }

  //checking the current track is favourite or not
  function getIsFavourite(trackId: any, userIds: any) {
    try {
      const db = getDatabase();
      const reference = ref(db, "users/" + userIds + "/favourite/" + trackId);
      onValue(reference, (snapshot) => {
        if (snapshot?.val()) {
          const isFavourit = snapshot.val().isFavourite;
          // console.log("isFavourit :::  " + isFavourit);
          setFavourite(isFavourit);
        } else {
          // console.log("isFavourit is false ::  ");
          setFavourite(false);
        }
      });
    } catch (e) {
      console.log("error in getting : ", e);
    }
  }

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
            <View style={styles.textFavouriteView}>
              <TextTicker
                style={styles.tickerText}
                duration={10000}
                animationType="scroll"
                loop
                bounce={false}
                repeatSpacer={50}
              >
                {musicDetail.trackName}
              </TextTicker>
              <TouchableOpacity
                onPress={() => {
                  setOrRemoveFavorite(musicDetail.trackId);
                }}
                style={styles.favBtn}
              >
                <MaterialIcons
                  name={isFavourite ? "favorite" : "favorite-outline"}
                  size={24}
                  color={Colors.red}
                />
              </TouchableOpacity>
            </View>
            <SeekBar
              onSeek={seek}
              trackLength={totalLength}
              onSlidingStart={sliding}
              currentPosition={currentPosition}
            />
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.playBtn} onPress={playSound}>
                <Ionicons
                  name={isPlaying ? "ios-pause-sharp" : "ios-play"}
                  size={20}
                  color={Colors.white}
                />
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
