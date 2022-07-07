import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Font } from "../../constants/Font";

//styles for Intro screen views

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 22,
    marginTop: 30,
    textAlign: "center",
  },
  imageStyle: {
    // height: PixelRatio.getPixelSizeForLayoutSize(135),
    height: "100%",
    width: "100%",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: hp("30%"),
    marginVertical: 30,
    position: "absolute",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.white,
    textAlign: "center",
    fontFamily: Font.SemiBoldFont,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: hp("10%"),
    left: 20,
    right: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 8,
    width: 40,
    borderRadius: 10 / 2,
    backgroundColor: Colors.accent,
    marginLeft: 10,
  },
  page: {
    width: wp("100%"),
    height: hp("100%"),
    overflow: "hidden",
  },
  mainContainer: { flex: 1, backgroundColor: Colors.primary },
  imageView: {
    height: hp("45%"),
    width: wp("100%"),
    alignSelf: "center",
    borderTopLeftRadius: wp("50%"),
    borderTopRightRadius: wp("50%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    overflow: "hidden",
  },
  scrollViewStyle: { flex: 1 },
});
export default styles;
