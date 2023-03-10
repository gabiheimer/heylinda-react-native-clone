import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import MeditationCard from "../../components/MeditationCard";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";
import {
  anxiety,
  Meditation,
  meditations,
  popular,
  sleep,
} from "../../data/meditations";
import Storage from "../../storage/storage";
import { MainStackParamList } from "../../types";

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function Home({ navigation }: Props) {
  const [favourites, setFavourites] = useState<Meditation[]>([]);

  async function getFavourites(): Promise<void> {
    const favouriteIds = await Storage.getFavourites();
    const storedFavourites = meditations.filter((meditation) =>
      favouriteIds.includes(meditation.id)
    );
    setFavourites(storedFavourites);
  }

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <Screen scroll>
      <Text style={styles.title}>POPULAR</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popular}
        renderItem={(item) => (
          <MeditationCard
            item={item}
            isPopular
            navigation={navigation}
            updateFavourites={getFavourites}
          />
        )}
        keyExtractor={({ id }) => id}
      />
      <Text style={styles.title}>ANXIETY</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={anxiety}
        renderItem={(item) => (
          <MeditationCard
            item={item}
            navigation={navigation}
            updateFavourites={getFavourites}
          />
        )}
        keyExtractor={({ id }) => id}
      />
      <Text style={styles.title}>SLEEP</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sleep}
        renderItem={(item) => (
          <MeditationCard
            item={item}
            navigation={navigation}
            updateFavourites={getFavourites}
          />
        )}
        keyExtractor={({ id }) => id}
      />
      {favourites.length > 0 && (
        <>
          <Text style={styles.title}>FAVOURITE</Text>
          <FlatList
            style={styles.cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={favourites}
            renderItem={(item) => (
              <MeditationCard
                item={item}
                navigation={navigation}
                updateFavourites={getFavourites}
              />
            )}
            keyExtractor={({ id }) => id}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 19,
  },
});
