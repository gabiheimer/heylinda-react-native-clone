import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { openURL } from "expo-linking";
import { Alert } from "react-native";
import { Divider, List } from "react-native-paper";
import Storage from "../../storage/storage";
import { MainStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function Settings({ navigation }: Props) {
  const openPrivacyPolicy = async () => {
    try {
      await openURL("https://www.heylinda.app/privacy");
    } catch (error) {
      console.error(error);
    }
  };
  const clearData = () => {
    Alert.alert(
      "Clear Data",
      "Are you sure you want to delete your data? All your stats will be reset. This cannot be undone.",
      [
        {
          text: "Clear Data",
          onPress: () => Storage.clearStorage(),
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };
  return (
    <>
      <List.Item title="Clear Data" onPress={clearData} />
      <Divider />
      <List.Item title="Privacy Policy" onPress={openPrivacyPolicy} />
      <Divider />
      <List.Item
        title="About"
        onPress={() => navigation.navigate("AboutScreen")}
      />
      <Divider />
    </>
  );
}
