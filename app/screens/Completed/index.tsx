import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { MainStackParamList } from "../../types";

interface Props {
    navigation: NativeStackNavigationProp<MainStackParamList, 'CompletedScreen'>
}

export default function Completed({ navigation }: Props) {
    return (
        <View>
            <Text>Completed!</Text>
        </View>
    );
}