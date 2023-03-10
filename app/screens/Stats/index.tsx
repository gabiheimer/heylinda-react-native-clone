import { useEffect, useState } from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";
import quotes from "../../data/quotes";
import { AntDesign as Icon } from "@expo/vector-icons";
import Calendar from "./Calendar";

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

export default function StatsScreen() {
  const [markedDates, setMarkedDates] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [listenedStat, setListenedStat] = useState(0);
  const [streak, setStreak] = useState(0);
  const primary = Colors.primary;
  const quote = getQuote();

  async function getCalendarData(): Promise<void> {
    // TODO: get data
  }

  useEffect(() => {
    getCalendarData();
  }, []);

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
