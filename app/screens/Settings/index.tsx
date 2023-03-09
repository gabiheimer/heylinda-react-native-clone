import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SettingsParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<SettingsParamList, "SettingsScreen">;
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
