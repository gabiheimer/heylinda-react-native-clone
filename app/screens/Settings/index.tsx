import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { MainStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function Settings({ navigation }: Props) {
  return (
    <View>
      <Button onPress={() => navigation.navigate("AboutScreen")}>
        Go to about
      </Button>
    </View>
  );
}
