import React from "react";
import { TextStyle } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";

import { StyleProp } from "react-native";
import Colors from "../constants/Colors";

interface Props {
  isFavourited: boolean;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
}

export default function FavouriteButton(props: Props) {
  const { isFavourited, onPress, style } = props;
  const primary = Colors.primary;

  return (
    <Icon
      name={isFavourited ? "heart" : "hearto"}
      style={[style]}
      size={25}
      color={primary}
      onPress={onPress}
    />
  );
}
