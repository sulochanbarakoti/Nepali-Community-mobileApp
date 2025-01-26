import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) return <Redirect href="sign-in" />;

  const LogOut = () => {
    dispatch(logoutUser());
    return <Redirect href="sign-in" />;
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        {user ? (
          <View className="h-full space-y-5">
            <View className="mt-4 justify-center items-center">
              <View className="w-[95%] h-[250px] justify-center bg-white items-center rounded-2xl shadow-lg space-y-2">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[150px] h-[150px] rounded-full border-4 border-primary"
                  resizeMode="cover"
                />
                <Text className="text-2xl font-bold text-primary">
                  @{user?.username}
                </Text>
                <Text className="text-lg text-gray-600">{user?.email}</Text>
              </View>
            </View>
            <View className="px-4">
              <View className="bg-white p-4 rounded-2xl shadow-lg space-y-4">
                <TouchableOpacity className="flex-row items-center space-x-3">
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    color="black"
                  />
                  <Text className="text-lg">Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center space-x-3">
                  <MaterialCommunityIcons
                    name="account-settings-outline"
                    size={24}
                    color="black"
                  />
                  <Text className="text-lg">Account Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center space-x-3">
                  <AntDesign name="logout" size={24} color="black" />
                  <Link href="sign-in">
                    <Text className="text-lg" onPress={LogOut}>
                      Log Out
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Loading...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
