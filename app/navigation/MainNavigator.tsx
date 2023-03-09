import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import BottomTabNavigator from './BottomTabNavigator'
import CompletedScreen from '../screens/Completed'
import Colors from '../constants/Colors'
import { MainStackParamList } from '../types'

const Stack = createNativeStackNavigator<MainStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen
        name="CompletedScreen"
        component={CompletedScreen}
        options={{
          headerShown: false,
          headerBackTitle: 'Back',
          headerTitle: 'Completed',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.primary,
  },
})
