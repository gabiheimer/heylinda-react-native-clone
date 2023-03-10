import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Colors from "../constants/Colors";
import { Meditation } from "../data/meditations";
import { MainStackParamList } from "../types";
import getMeditationFilePath from "../utils/meditationUtils";
import DownloadButton from "./DownloadButton";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";

interface Props {
  item: ListRenderItemInfo<Meditation>;
  isPopular?: boolean;
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function MeditationCard({
  item: { item: meditationItem },
  isPopular = false,
  navigation,
}: Props) {
  const textColor = Colors.text;

  async function isMeditationDownloaded(): Promise<boolean> {
    const filePath = await getMeditationFilePath(meditationItem.uri);
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return fileInfo.exists;
  }

  async function saveMeditationAudio(): Promise<void> {
    const filePath = await getMeditationFilePath(meditationItem.uri);
    await FileSystem.downloadAsync(meditationItem.uri, filePath);
  }

  return (
    <Card
      style={styles.card}
      onPress={async () => {
        navigation.navigate("PlayScreen", {
          id: meditationItem.id,
        });
      }}
    >
      <Card.Cover
        style={isPopular ? styles.popularImage : styles.cardImage}
        source={meditationItem.image}
      />
      <Card.Title
        titleStyle={[styles.cardTitle, { color: textColor }]}
        subtitleStyle={styles.cardSubtitle}
        title={meditationItem.title}
        subtitle={meditationItem.subtitle}
      />
      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.cardParagraph}>
          {meditationItem.time} minutes
        </Paragraph>
        <DownloadButton
          download={saveMeditationAudio}
          isInitiallyDownloaded={isMeditationDownloaded}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardImage: {
    height: 135,
  },
  popularImage: {
    height: 250,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardSubtitle: {
    color: Colors.gray800,
    fontSize: 14,
  },
  cardParagraph: {
    color: Colors.purple900,
    fontWeight: "600",
  },
});
