import {
  NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'
import MainNavigator from './MainNavigator'
import { StatusBar } from 'expo-status-bar'

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MainNavigator} />
    </Stack.Navigator>
  )
}
