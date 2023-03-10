import { useEffect, useState } from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";
import quotes from "../../data/quotes";
import { AntDesign as Icon } from "@expo/vector-icons";
import Calendar from "./Calendar";
import Storage from "../../storage/storage";
import dayjs from "dayjs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../types";

const getQuote = (): { quote: string; author: string } => {
  const max = quotes.length - 1;
  const r = Math.floor(Math.random() * max);
  const item = quotes[r];
  const quote = item.text;
  const author = item.author;

  return {
    quote,
    author,
  };
};

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

export default function StatsScreen({ navigation }: Props) {
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [listenedStat, setListenedStat] = useState("");
  const [streak, setStreak] = useState(0);
  const primary = Colors.primary;
  const quote = getQuote();

  function updateTotalSessions(storedActivity: Map<string, number[]>) {
    const values = [...storedActivity.values()];
    const totalSessionsValue = values.flatMap((session) => session).length;
    setTotalSessions(totalSessionsValue);
  }

  function updateStreak(activity: Map<string, number[]>) {
    const now = new Date();
    let curDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let curDateString = dayjs(curDate).format("YYYY-MM-DD");
    let curStreak = 0;

    if (!activity.size) {
      setStreak(0);
      return;
    }

    while (activity.has(curDateString)) {
      curStreak++;
      let yesterday = new Date(curDate.getTime());
      yesterday.setDate(curDate.getDate() - 1);
      curDateString = dayjs(yesterday).format("YYYY-MM-DD");
    }

    setStreak(curStreak);
  }

  function updateListenedStat(activity: Map<string, number[]>) {
    const values = [...activity.values()];
    const totalMillis =
      activity.size === 0
        ? 0
        : values
            .flatMap((meditationDuration) => meditationDuration)
            .reduce((accTime, sessionTime) => accTime + sessionTime, 0);

    let minutes = Math.floor(totalMillis / 60000);
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    if (hours > 0 && minutes > 0) {
      setListenedStat(`${hours}h ${minutes}m`);
    } else if (hours > 0) {
      setListenedStat(`${hours} hour${hours == 1 ? "" : "s"}`);
    } else {
      setListenedStat(`${minutes} min${minutes == 1 ? "" : "s"}`);
    }
  }

  async function getCalendarData(): Promise<void> {
    const storedActivity = await Storage.getActivity();
    setMarkedDates([...storedActivity.keys()]);
    updateTotalSessions(storedActivity);
    updateStreak(storedActivity);
    updateListenedStat(storedActivity);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getCalendarData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Screen scroll>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cards}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name="Trophy"
                style={styles.icon}
                size={30}
                color={primary}
              />
              <Paragraph>Current Streak</Paragraph>
              <Title>
                {streak} day{streak === 1 ? "" : "s"}
              </Title>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name="calendar"
                style={styles.icon}
                size={30}
                color={primary}
              />
              <Paragraph>Total Sessions</Paragraph>
              <Title>
                {totalSessions} session{totalSessions === 1 ? "" : "s"}
              </Title>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name="clockcircleo"
                style={styles.icon}
                size={30}
                color={primary}
              />
              <Paragraph>Time Meditating</Paragraph>
              <Title>{listenedStat}</Title>
            </Card.Content>
          </Card>
        </ScrollView>
        <Calendar markedDates={markedDates} />
        <View style={styles.quoteContainer}>
          <Card style={styles.quoteCard}>
            <Card.Content style={styles.cardContent}>
              <Paragraph>{quote.author}</Paragraph>
              <Title style={styles.quoteTitle}>{quote.quote}</Title>
            </Card.Content>
          </Card>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 30,
  },
  card: {
    width: 150,
    marginRight: 10,
    textAlign: "center",
  },
  quoteContainer: { marginRight: 10, marginBottom: 30 },
  quoteCard: {
    width: "100%",
  },
  quoteTitle: {
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
});
