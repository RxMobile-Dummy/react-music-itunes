import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Font } from "../../constants/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  formStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: Colors.white,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
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
  signInBtn: { color: Colors.accent, fontFamily: Font.BoldFont },
  btn: { alignSelf: "center" },
  logo: {
    height: 150,
    alignSelf: "center",
  },
});
export default styles;
