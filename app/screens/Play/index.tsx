import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
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
    </View>
  );
}
