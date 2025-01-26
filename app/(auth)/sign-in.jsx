import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import images from "../../constants/images";
import CustomButton from "../../components/customButton";
import { AntDesign } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, loginUser } from "../../redux/slices/userSlice";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoggedIn) return <Redirect href="home" />;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const submit = () => {
    dispatch(loginUser({ email: form.email, password: form.password }));
    if (isLoggedIn) return <Redirect href="home" />;
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
            <Text className="text-2xl font-bold">Welcome back!</Text>
            <Text className="text-md font-semibold">Login to your account</Text>
          </View>
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

          {error && <Text className="text-red-500">{error}</Text>}

          <CustomButton
            title="Sign In"
            otherStyle="bg-primary w-[50%] mt-5"
            handlePress={submit}
          />

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
