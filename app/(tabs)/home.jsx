import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleViewDetails = (event) => {
    router.push({
      pathname: "eventDetailsPage",
      params: { event: JSON.stringify(event) },
    });
  };

  const events = [
    {
      title: "Dashain Event",
      details: "Details about the upcoming event 1. Date, time, and location.",
      date: "2023-12-01",
      time: "10:00 AM",
      location: "Jakobstad",
    },
    {
      title: "Tihar Event",
      details: "Details about the upcoming event 2. Date, time, and location.",
      date: "2023-12-15",
      time: "2:00 PM",
      location: "Jakobstad",
    },
  ];

  return (
    <SafeAreaView className="h-full bg-primary">
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
      <ScrollView>
        <View className="bg-gray-200 py-2">
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

          {/* Coming Events Section */}
          <View className="bg-gray-100 px-3 py-5 mt-5">
            <Text className="text-black text-lg font-bold mb-0">
              Coming Events
            </Text>
            {events.map((event, index) => (
              <View
                key={index}
                className="bg-gray-200 p-3 rounded-md shadow-lg space-y-2 mt-4"
              >
                <Text className="text-base font-semibold">{event.title}</Text>
                <Text>{event.details}</Text>
                <TouchableOpacity
                  className="p-2 border-2 border-secondary rounded-md self-start"
                  onPress={() => handleViewDetails(event)}
                >
                  <Text>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
