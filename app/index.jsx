import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/customButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../redux/slices/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  if (isLoading) {
    return null;
  }
  if (isLoggedIn) return <Redirect href="home" />;
  console.log(user, isLoggedIn);
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
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
