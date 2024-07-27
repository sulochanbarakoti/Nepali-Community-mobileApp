import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const CreatePost = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
  });

  const openPicker = async () => {
    console.log("Open Picker");
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="space-y-6 mx-5">
          <View className="flex-row items-center mt-4">
            <Entypo name="cross" size={24} color="black" />
            <Text className="text-lg ml-6">Create a post</Text>
            {/* <TouchableOpacity>
              <Text className="font-bold text-secondary">Post</Text>
            </TouchableOpacity> */}
          </View>
          <View className="mt-4">
            <TextInput
              placeholder="Add a title..."
              className="border-white p-2 rounded-xl bg-white"
            />
          </View>
          <View className="mt-4">
            <TextInput
              placeholder="Add a discription..."
              className="border-white p-2 rounded-xl bg-white"
              multiline
            />
          </View>
          <View className="bg-white mt-5 rounded-xl h-[180px] justify-center items-center">
            <TouchableOpacity
              className="items-center"
              onPress={() => openPicker()}
            >
              <Entypo name="upload" size={50} color="black" />
              <Text
                className="text-secondary font-semibold
              "
              >
                Upload image
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white mt-5 rounded-xl h-[180px] justify-center items-center">
            <TouchableOpacity
              className="items-center"
              onPress={() => openPicker()}
            >
              <Entypo name="upload-to-cloud" size={50} color="black" />
              <Text
                className="text-secondary font-semibold
              "
              >
                Upload video
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
