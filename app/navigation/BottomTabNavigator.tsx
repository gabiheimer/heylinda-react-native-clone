import { AntDesign as Icon } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import StatsScreen from "../screens/Stats";
import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors.tint, headerShown: true }}
    >
      <BottomTab.Group
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.white,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="setting" color={color} />
            ),
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  return <Icon size={25} style={styles.tabBarIcon} {...props} />;
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "600",
    color: Colors.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.primary,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
