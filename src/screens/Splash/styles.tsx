import { StyleSheet } from "react-native";
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
  },
  muzikImg: {
    width: 300,
    height: 200,
  },
});
export default styles;
