import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { MainStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function Home({ navigation }: Props) {
  return (
    <View>
      <Text>Home!</Text>
      <Button
        onPress={() =>
          navigation.navigate("PlayScreen", {
            id: "123",
          })
        }
      >
        Go to details
      </Button>
    </View>
  );
}