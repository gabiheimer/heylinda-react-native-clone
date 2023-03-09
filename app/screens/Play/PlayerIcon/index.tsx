import * as React from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

function PlayerIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color?: string;
  size?: number;
  onPress: () => void;
}) {
  const primary = Colors.primary;
  return (
    <Icon size={50} color={primary} style={styles.playerIcon} {...props} />
  );
}

const styles = StyleSheet.create({
  playerIcon: { marginBottom: -3 },
});

export default PlayerIcon;
