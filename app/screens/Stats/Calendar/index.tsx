import * as React from "react";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";

import { Calendar as DefaultCalendar } from "react-native-calendars";
import Colors from "../../../constants/Colors";

interface Props {
  markedDates: string[];
}

export default function Calendar({ markedDates }: Props) {
  const white = Colors.white;
  const primary = Colors.primary;
  const textColor = Colors.text;

  const formattedMarkedDates = () => {
    const today = dayjs().format("YYYY-MM-DD");
    let result: { [x: string]: { selected: boolean } | { marked: boolean } } =
      {};

    markedDates.reduce((obj, date) => {
      obj[date] = {
        selected: true,
      };
      return obj;
    }, result);

    result[today] = { marked: true };

    return result;
  };

  return (
    <DefaultCalendar
      style={styles.calendar}
      markedDates={formattedMarkedDates()}
      theme={{
        backgroundColor: white,
        calendarBackground: white,
        textSectionTitleColor: "#b6c1cd",
        selectedDayBackgroundColor: primary,
        selectedDayTextColor: white,
        todayTextColor: primary,
        dayTextColor: textColor,
        textDisabledColor: "#d9e1e8",
        dotColor: primary,
        selectedDotColor: white,
        arrowColor: textColor,
        monthTextColor: textColor,
        indicatorColor: "blue",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginRight: 14,
    marginBottom: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
