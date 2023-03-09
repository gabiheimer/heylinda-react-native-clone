import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";

import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";

interface Props {
  download: () => Promise<void>;
  isInitiallyDownloaded: () => Promise<boolean>;
}

export default function DownloadButton(props: Props) {
  const { download, isInitiallyDownloaded } = props;
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const primary = Colors.primary;

  async function initDownloaded(): Promise<void> {
    const initiallyDownloaded = await isInitiallyDownloaded();
    setDownloaded(initiallyDownloaded);
  }

  useEffect(() => {
    initDownloaded();
  }, []);

  async function onDownload(): Promise<void> {
    if (downloaded) return;

    setDownloaded(false);
    setDownloading(true);

    await download();

    setDownloading(false);
    setDownloaded(true);
  }

  if (downloading) {
    return <ActivityIndicator color={primary} />;
  } else if (downloaded) {
    return (
      <Icon
        name="checkcircleo"
        style={[styles.icon, styles.downloadButton]}
        size={15}
        color={primary}
      />
    );
  } else {
    return (
      <Icon
        name="download"
        style={[styles.icon, styles.downloadButton]}
        size={15}
        color={primary}
        onPress={onDownload}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
  },
  downloadButton: {
    position: "relative",
    top: -6,
  },
});
