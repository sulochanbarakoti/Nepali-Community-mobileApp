import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { createNewEvent } from "../redux/slices/eventSlice";

const createEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.user);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventImage, setEventImage] = useState(null);

  const handleCreateEvent = async () => {
    const eventData = {
      eventTitle,
      eventDescription,
      eventDate,
      eventTime,
      eventLocation,
      eventImage,
      userId: user.$id,
    };

    if (
      !eventTitle ||
      !eventDescription ||
      !eventDate ||
      !eventTime ||
      !eventLocation ||
      !eventImage
    ) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      await dispatch(createNewEvent(eventData));
      Alert.alert("Event created successfully");
      router.push("home");
    } catch (error) {
      Alert.alert("Failed to create event");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0]);
    }
  };

  return (
    <SafeAreaView className="h-full p-4 bg-gray-100">
      <ScrollView>
        <View className="bg-white p-4 rounded-md shadow-lg">
          <Text className="text-2xl font-bold mb-4">Create Event</Text>
          <TextInput
            value={eventTitle}
            onChangeText={setEventTitle}
            placeholder="Event Title"
            className="border border-gray-300 p-2 rounded-md mb-4"
          />
          <TextInput
            value={eventDescription}
            onChangeText={setEventDescription}
            placeholder="Event Description"
            className="border border-gray-300 p-2 rounded-md mb-4"
            multiline
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
          />
          <TextInput
            value={eventDate}
            onChangeText={setEventDate}
            placeholder="Event Date (YYYY-MM-DD)"
            className="border border-gray-300 p-2 rounded-md mb-4"
          />
          <TextInput
            value={eventTime}
            onChangeText={setEventTime}
            placeholder="Event Time (HH:MM)"
            className="border border-gray-300 p-2 rounded-md mb-4"
          />
          <TextInput
            value={eventLocation}
            onChangeText={setEventLocation}
            placeholder="Event Location"
            className="border border-gray-300 p-2 rounded-md mb-4"
          />

          {eventImage ? (
            <View className="mb-4">
              <Text className="text-lg font-bold">Event Image</Text>
              <Image
                source={{ uri: eventImage.uri }}
                className="w-full h-64 rounded-md mt-2"
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="bg-gray-200 h-40 p-4 rounded-md mb-4 justify-center items-center"
            >
              <Text className="text-center text-lg mb-2">
                <MaterialIcons name="cloud-upload" size={32} color="black" />
              </Text>
              <Text className="text-black text-center text-lg">
                Upload Image
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleCreateEvent}
            className="bg-blue-500 p-4 rounded-md mt-4"
          >
            <Text className="text-white text-center text-lg">Create Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default createEvent;
