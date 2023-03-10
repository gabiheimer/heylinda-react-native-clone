import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { openURL } from "expo-linking";
import { StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";
import { MainStackParamList } from "../../types";
import { AntDesign as Icon } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";

type PlayRouteProp = RouteProp<MainStackParamList, "CompletedScreen">;

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList, "CompletedScreen">;
  route: PlayRouteProp;
}

export default function Completed({ navigation, route }: Props) {
  const { totalSessions } = route.params;
  const primaryColor = Colors.primary;
  const onPressDonate = () => {
    openURL("https://opencollective.com/heylinda/donate");
  };
  const onPressSkip = () => navigation.replace("Main");

  return (
    <Screen style={[styles.screen, { backgroundColor: primaryColor }]}>
      <Icon
        size={50}
        name="checkcircle"
        color={primaryColor}
        style={styles.checkMark}
      />
      <Text style={styles.title}> Congratulations!</Text>
      <Text style={styles.description}>
        You have completed {totalSessions} meditation
        {totalSessions === 1 ? "" : "s"}!{"\n"}Do you want to give a donation?
      </Text>
      <Button
        onPress={onPressDonate}
        style={styles.button}
        mode="contained"
        color={primaryColor}
      >
        Donate
      </Button>
      <Button
        onPress={onPressSkip}
        style={[styles.button, styles.skipButton]}
        mode="outlined"
        color={Colors.white}
      >
        Skip
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 40,
  },
  checkMark: {
    marginBottom: 20,
  },
  title: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  description: {
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 60,
  },
  button: {
    padding: 8,
    width: "100%",
    marginBottom: 20,
  },
  skipButton: {
    borderColor: Colors.white,
  },
});
