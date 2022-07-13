import React from "react";
import { Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";

interface Props {
  onPress?: () => void;
  isLike?: boolean;
  containerStyle?: any;
}
const LikeButton: React.FC<Props> = ({
  onPress = () => null,
  isLike = false,
  containerStyle = {},
}) => {
  const animatedButtonScale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };
  return (
    <Pressable
      style={containerStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[animatedScaleStyle]}>
        <MaterialCommunityIcons
          name={isLike ? "heart" : "heart-outline"}
          size={24}
          color={isLike ? Colors.red : Colors.white}
        />
      </Animated.View>
    </Pressable>
  );
};

export default LikeButton;
