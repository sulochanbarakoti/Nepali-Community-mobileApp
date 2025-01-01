import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { fetchEvents } from "../../redux/slices/eventSlice";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { events, status, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleViewDetails = (event) => {
    router.push({
      pathname: "eventPage",
      params: { event: JSON.stringify(event) },
    });
  };

  const eventsDetails = () => {
    switch (status) {
      case "loading":
        return <Text>Loading...</Text>;
      case "failed":
        return <Text>{error}</Text>;
      default:
        return (
          <View className="space-y-5">
            {events
              .filter((event) => event.eventActive)
              .map((event, index) => (
                <View
                  key={index}
                  className="bg-gray-200 p-3 rounded-md shadow-lg space-y-2 pb-5"
                >
                  <Text className="text-base font-semibold">
                    {event.eventTitle}
                  </Text>
                  <Text numberOfLines={2}>{event.eventDescription}</Text>
                  <Text>Date: {event.eventDate}</Text>
                  <TouchableOpacity
                    className="p-2 border-2 border-secondary rounded-md self-start"
                    onPress={() => handleViewDetails(event)}
                  >
                    <Text>View Details</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        );
    }
  };

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
            <Text className="text-black text-lg font-bold mb-5">
              Coming Events
            </Text>
            {eventsDetails()}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
