import { openURL } from "expo-linking";
import * as Application from "expo-application";
import { StyleSheet } from "react-native";
import { Caption, Divider, List } from "react-native-paper";

export default function About() {
  const openAboutUs = () => {
    try {
      openURL("https://www.heylinda.app/about");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <List.Item
        title="Application Version"
        right={() => (
          <Caption style={styles.caption}>
            {Application.nativeApplicationVersion}
          </Caption>
        )}
      />
      <Divider />
      <List.Item
        title="Build Version"
        right={() => (
          <Caption style={styles.caption}>
            {Application.nativeBuildVersion}
          </Caption>
        )}
      />
      <Divider />
      <List.Item title="About Us" onPress={openAboutUs} />
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: 5,
  },
});
