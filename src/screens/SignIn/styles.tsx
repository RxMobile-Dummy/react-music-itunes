import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Font } from "../../constants/Font";

//Style for sign in screen views

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  formStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    color: Colors.white,
    fontFamily: Font.BoldFont,
    alignSelf: "center",
    marginTop: hp("10%"),
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
  },
  bottomText: { color: "white", marginEnd: 5, fontFamily: Font.MediumFont },
  regBtn: { color: Colors.accent, fontFamily: Font.BoldFont },
  btn: { alignSelf: "center" },
  logo: {
    height: 150,
    alignSelf: "center",
  },
});
export default styles;
