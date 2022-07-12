import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  // Slider,
} from "react-native";

// var Slider = require('react-native-slider');
import Slider from "@react-native-community/slider";
import { Colors } from "../../constants/Color";

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// const minutesAndSeconds = (position) => [
//   pad(Math.floor(position / 60), 2),
//   pad(position % 60, 2),
// ];

const minutesAndSeconds = (position) => [
  Math.floor((position / 1000 / 60) << 0),
  Math.floor((position / 1000) % 60),
];

const SeekBar = ({ trackLength, currentPosition, onSeek, onSlidingStart }) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  const totalLength = minutesAndSeconds(trackLength);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 5 }}>
        <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40 }]}>
          {trackLength > 1 && totalLength[0] + ":" + totalLength[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onValueChange={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        style={styles.slider}
        minimumTrackTintColor={Colors.accent}
        maximumTrackTintColor="rgba(220, 220, 220, 0.5)"
        thumbTintColor={Colors.white}
      />
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    // backgroundColor: 'red',
    marginTop: 0,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  // track: {
  //   height: 2,
  //   borderRadius: 1,
  // },
  // thumb: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: 'white',
  // },
  text: {
    color: Colors.accent,
    fontSize: 12,
    textAlign: "center",
  },
});
