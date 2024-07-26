import { Redirect, router, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/customButton";
import { useGlobalContext } from "../context/globalProvider";

export default function App() {
  const { isLoggedIn } = useGlobalContext();
  if (isLoggedIn) return <Redirect href="home" />;
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center">
          <Image
            source={images.pngLogo}
            className="h-[250px]"
            resizeMode="contain"
          />

          <View className="w-[90%] justify-center items-center mt-4">
            <Text className="text-primary text-center text-2xl">
              Welcome to Nepali Community In Finland.
            </Text>
          </View>

          <CustomButton
            title="Login to your account"
            otherStyle="bg-primary w-[80%] mt-4"
            handlePress={() => router.push("sign-in")}
          />
          <Text className="text-primary text-2xl font-bold mt-3">'Or'</Text>

          <CustomButton
            title="Continue as Guest"
            otherStyle="bg-primary w-[80%] mt-4"
            handlePress={() => router.push("home")}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
