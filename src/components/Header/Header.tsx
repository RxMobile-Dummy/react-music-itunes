import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../../constants/Font";

interface Props {
  title: string;
  showBackButton?: boolean;
  onPress?: () => void;
}
const Header: React.FC<Props> = ({
  title,
  showBackButton = false,
  onPress = () => null,
}) => {
  return (
    <View style={styles.header}>
      {showBackButton === true ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={Colors.slide2Color}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Text style={styles.headerText}>{title}</Text>
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.slide2Color,
    fontFamily: Font.MediumFont,
  },
});
export default Header;
