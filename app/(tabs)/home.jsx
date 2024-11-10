import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <SafeAreaView className="h-full flex-1 bg-primary">
      <View className="h-[15vh] justify-center items-center">
        <Image
          source={images.pngLogo}
          className="h-20 w-22"
          resizeMode="contain"
        />
        <Text className="text-white font-semibold text-xl">
          Nepali Community Group, Jakobstad
        </Text>
      </View>
      <View className="bg-gray-200 h-[85vh] py-2">
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="h-10 px-2 "
          >
            <TouchableOpacity>
              <View className="bg-secondary rounded-full p-1 px-4 mr-2 flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-md font-bold pl-2">Members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-secondary rounded-full p-1 px-4 mr-2 flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-md font-bold pl-2">Members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-secondary rounded-full p-1 px-4 mr-2 flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-md font-bold pl-2">Members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-secondary rounded-full p-1 px-4 mr-2 flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-md font-bold pl-2">Members</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          <View className="bg-gray-100 px-3 py-5">
            <Text className="text-black text-lg font-bold mb-5">
              Join the Nepali Community
            </Text>
            <View className="bg-gray-200 p-3 rounded-md shadow-lg space-y-2">
              <Text className="text-base font-semibold">
                Join our community !!
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas soluta, consequatur fugit voluptates omnis, id ad
                asperiores inventore quod nisi unde consequuntur, ex cupiditate
                quis. Sunt veritatis non reiciendis excepturi?
              </Text>
              <TouchableOpacity className="p-2 border-2 border-secondary rounded-md self-start">
                <Text>Join Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
