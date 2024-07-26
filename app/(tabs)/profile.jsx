import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/globalProvider";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  return (
    <SafeAreaView className="bg-gray-300 h-full">
      <ScrollView>
        <View className="h-full">
          <View className="flex-row justify-between pl-2">
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text className="text-lg font-bold text-primary">Profile</Text>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
          </View>
          <View className=" mt-4 w-[95%] justify-center items-center">
            <View className=" w-full justify-center bg-white items-center rounded-2xl p-2">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[150px] h-[150px] rounded-full"
                resizeMode="cover"
              />
              <Text className="text-xl font-bold">@{user.username}</Text>
            </View>
          </View>
          <View className="w-[80%] h-[60px] bg-gray-300 mt-5 rounded-xl flex-row justify-start items-center space-x-2 pl-2">
            <Ionicons name="document" size={35} color="black" />
            <Text className="text-xl font-bold">Orders</Text>
          </View>
          <View className="w-[80%] h-[60px] bg-gray-300 mt-5 rounded-xl flex-row justify-start items-center space-x-2 pl-2">
            <Ionicons name="document" size={35} color="black" />
            <Text className="text-xl font-bold">Orders</Text>
          </View>
          <View className="w-[80%] h-[60px] bg-gray-300 mt-5 rounded-xl flex-row justify-start items-center space-x-2 pl-2">
            <Ionicons name="document" size={35} color="black" />
            <Text className="text-xl font-bold">Orders</Text>
          </View>
          <View className="w-[80%] h-[60px] bg-gray-300 mt-5 rounded-xl flex-row justify-start items-center space-x-2 pl-2">
            <Ionicons name="document" size={35} color="black" />
            <Text className="text-xl font-bold">Orders</Text>
          </View>
          <View className="w-[80%] h-[60px] bg-gray-300 mt-5 rounded-xl flex-row justify-start items-center space-x-2 pl-2">
            <Ionicons name="document" size={35} color="black" />
            <Text className="text-xl font-bold">Orders</Text>
          </View>
          <CustomButton title="Log Out" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
