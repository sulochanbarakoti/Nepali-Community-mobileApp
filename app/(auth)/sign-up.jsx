import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import images from "../../constants/images";
import CustomButton from "../../components/customButton";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async () => {
    if (form.email !== "" && form.password !== "" && form.username !== "") {
      try {
        const result = await createUser(
          form.username,
          form.email,
          form.password
        );
        console.log(result);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      Alert.alert("Error", "Please fill in all the fields");
    }
  };

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
            <Text className="text-2xl font-bold">Welcome!</Text>
            <Text className="text-md font-semibold">Create your account</Text>
          </View>
          <FormField
            title="Username"
            otherStyle="mt-5"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

          <FormField
            title="Email"
            otherStyle="mt-5"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />

          <FormField
            title="Password"
            otherStyle="mt-5"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            handlePress={submit}
            title="Sign Up"
            otherStyle="bg-primary w-[50%] mt-5"
          />

          <View className="mt-5">
            <Text className="text-primary text-md font-bold">
              Or sign up with
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
