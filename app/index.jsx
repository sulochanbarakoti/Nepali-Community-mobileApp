import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  SplashScreen.hideAsync();
  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      <StatusBar backgroundColor="white" style="auto" />
    </SafeAreaView>
  );
}
