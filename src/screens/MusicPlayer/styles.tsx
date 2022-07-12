import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Color";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  video: {
    alignSelf: "center",
    height: Dimensions.get("screen").height - 150,
    width: Dimensions.get("screen").width - 30,
  },
  artImg: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
  },
  audioVw: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    alignSelf: "center",
  },
  videoVw: {
    height: Dimensions.get("screen").height - 150,
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "transparent",
    margin: 15,
  },
  tickerText: {
    fontSize: 18,
    color: Colors.accent,
  },
  textFavouriteView: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginStart: 20,
    marginEnd: 50,
  },
  favBtn: { marginStart: 10 },
});
export default styles;
