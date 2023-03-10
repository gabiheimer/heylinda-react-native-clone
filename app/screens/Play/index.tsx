import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Text, Image, StyleSheet } from "react-native";
import { MainStackParamList } from "../../types";
import { Audio, AVPlaybackStatus } from "expo-av";
import { meditations } from "../../data/meditations";
import Storage from "../../storage/storage";
import getMeditationFilePath from "../../utils/meditationUtils";
import * as FileSystem from "expo-file-system";
import LoadingScreen from "../../components/LoadingScreen";
import Screen from "../../components/Screen";
import FavouriteButton from "../../components/FavouriteButton";
import PlayerControls from "./PlayerControls";
import dayjs from "dayjs";

type PlayRouteProp = RouteProp<MainStackParamList, "PlayScreen">;
type PlayNavProp = NativeStackNavigationProp<MainStackParamList>;

interface Props {
  navigation: PlayNavProp;
  route: PlayRouteProp;
}

function formatToString(n: number) {
  return n < 10 ? `0${n}` : n;
}

function msToTime(s: number) {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const minsString = formatToString(mins);
  const secsString = formatToString(secs);

  return minsString + ":" + secsString;
}

export default function PlayScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMills, setDurationMills] = useState(0);
  const durationTime = msToTime(durationMills);
  const positionTime = msToTime(positionMillis);
  const meditation = meditations.find((meditation) => meditation.id === id)!;
  const uri = meditation?.uri || "";
  const [isFavourited, setIsFavourited] = useState(false);

  async function initStorage(): Promise<void> {
    const storageValue = await Storage.isFavourite(id);
    setIsFavourited(storageValue);
  }

  useEffect(() => {
    initStorage();
  }, []);

  const onFavourite = () => {
    Storage.updateFavourites(id);
    setIsFavourited(!isFavourited);
  };

  async function updateActivity(duration: number): Promise<void> {
    const today = dayjs().format("YYYY-MM-DD");
    await Storage.updateActivity(today, duration);
    navigation.replace("CompletedScreen");
  }

  const onPlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatus) => {
      if (!playbackStatus.isLoaded) {
        // Update your UI for the unloaded state
      } else {
        // Update your UI for the loaded state
        if (playbackStatus.positionMillis) {
          setPositionMillis(playbackStatus.positionMillis);
        }
        if (playbackStatus.durationMillis) {
          setDurationMills(playbackStatus.durationMillis);
        }
        if (playbackStatus.didJustFinish) {
          setIsPlaying(false);
          updateActivity(playbackStatus.durationMillis ?? 0);
        }
      }
    },
    []
  );

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const loadAudio = async () => {
      setIsLoadingAudio(true);

      const filePath = await getMeditationFilePath(uri);
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      if (fileInfo.exists) {
        // Load from downloaded audio file
        const _sound = new Audio.Sound();
        _sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await _sound.loadAsync({ uri: filePath });
        setSound(_sound);
      } else {
        // Load from remote URI
        const { sound: _sound } = await Audio.Sound.createAsync(
          { uri },
          {},
          onPlaybackStatusUpdate
        );
        setSound(_sound);
      }

      setIsLoadingAudio(false);
    };

    loadAudio();
  }, [onPlaybackStatusUpdate, uri]);

  const replay = async () => {
    await sound?.setPositionAsync(positionMillis - 10 * 1000);
  };

  const forward = async () => {
    await sound?.setPositionAsync(positionMillis + 10 * 1000);
  };

  const play = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const { title, subtitle, image } = meditation;

  if (isLoadingAudio) {
    return <LoadingScreen loading={isLoadingAudio} />;
  }

  return (
    <Screen style={styles.container}>
      <FavouriteButton
        isFavourited={isFavourited}
        style={styles.favourite}
        onPress={onFavourite}
      />
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <PlayerControls
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        replay={replay}
        forward={forward}
        positionTime={positionTime}
        durationTime={durationTime}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 31,
    paddingRight: 31,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 300,
    maxHeight: 300,
    marginBottom: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
  favourite: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
