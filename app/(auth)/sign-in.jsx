import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import images from "../../constants/images";
import CustomButton from "../../components/customButton";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-16 my-4">
          <View>
            <Image
              source={images.pngLogo}
              className="h-[150px]"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center items-center mt-6">
            <Text className="text-2xl font-bold">Welcome back!</Text>
            <Text className="text-md font-semibold">Login to your account</Text>
          </View>
          <FormField title="Username" otherStyle="mt-5" />

          <FormField title="Password" otherStyle="mt-5" />

          <CustomButton title="Sign In" otherStyle="bg-primary w-[50%] mt-5" />

          <View className="mt-5">
            <Text className="text-primary text-md font-bold">
              Or sign in with
            </Text>
          </View>

          <View className="mt-5 w-full justify-center flex-row">
            <View className="border-2 p-1 rounded-xl border-white bg-white shadow-black w-[50px] items-center mr-5">
              <AntDesign name="google" size={24} color="black" />
            </View>
            <View className="border-2 p-1 rounded-xl border-white bg-white shadow-black w-[50px] items-center mr-5">
              <AntDesign name="facebook-square" size={24} color="black" />
            </View>
            <View className="border-2 p-1 rounded-xl border-white bg-white shadow-black w-[50px] items-center">
              <AntDesign name="twitter" size={24} color="black" />
            </View>
          </View>

          <View className="mt-10">
            <Text className="text-primary text-md font-bold">
              Don't have an account?{" "}
              <Link href="sign-up" className="text-secondary">
                Sign up here
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
