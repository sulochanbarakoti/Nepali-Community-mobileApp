import { router, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/customButton";

SplashScreen.preventAutoHideAsync();

export default function App() {
  SplashScreen.hideAsync();
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center">
          <Image
            source={images.logo}
            className="h-[250px]"
            resizeMode="contain"
          />

          <View className="w-[90%] justify-center items-center">
            <Text className="text-white text-center text-2xl">
              Welcome to Nepali Community Mobile Application
            </Text>
          </View>

          <CustomButton
            title="Continue with Email..."
            otherStyle="w-[80%] mt-4"
            handlePress={() => router.push("sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1d161e" style="light" />
    </SafeAreaView>
  );
}
