import React from "react";
import { Platform, StyleSheet, ViewStyle, Animated } from "react-native";
import { Colors } from "../../constants/Color";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  text: string | number;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}
const AppButton: React.FC<Props> = ({
  onPress = () => null,
  containerStyle = {},
  disabled = false,
}) => {
  const animatedButtonScale = new Animated.Value(1);

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <Animated.View style={[animatedScaleStyle]}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityLabel="app-button"
        style={[styles.button, containerStyle]}
        disabled={disabled}
      >
        <MaterialIcons
          name="arrow-forward-ios"
          size={30}
          color={Colors.white}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "transparent",
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
});
export default AppButton;
