import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import CompletedScreen from "../screens/Completed";
import Colors from "../constants/Colors";
import { MainStackParamList } from "../types";
import AboutPage from "../screens/Settings/About";
import PlayScreen from "../screens/Play";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.white,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen
          name="CompletedScreen"
          component={CompletedScreen}
          options={{
            headerShown: false,
            headerTitle: "Completed",
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutPage}
          options={{
            headerShown: true,
            headerTitle: "About",
          }}
        />
        <Stack.Screen
          name="PlayScreen"
          component={PlayScreen}
          options={{
            headerTitle: "Play",
            headerShown: true,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
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
});
