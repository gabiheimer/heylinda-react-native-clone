import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { MainStackParamList } from "../../types";

type PlayRouteProp = RouteProp<MainStackParamList>;
type PlayNavProp = NativeStackNavigationProp<MainStackParamList>;

interface Props {
  navigation: PlayNavProp;
  route: PlayRouteProp;
}

export default function Play({ route, navigation }: Props) {
  return (
    <View>
      <Text>Play!</Text>
      <Button onPress={() => navigation.navigate("CompletedScreen")}>
        Go to completed
      </Button>
    </View>
  );
}
