import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/customButton";
import { ResizeMode, Video } from "expo-av";
import { createPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";

const CreatePost = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, image: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submitPost = async () => {
    if (!form.title && !form.description && !form.image && !form.video) {
      Alert.alert("Error", "Please fill in all fields");
    }
    try {
      await createPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.replace("home");
    } catch (error) {
      throw new Error(error);
    } finally {
      setForm({
        title: "",
        description: "",
        image: null,
        video: null,
      });
    }
  };
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="space-y-6 mx-5">
          <View className="flex-row items-center mt-4">
            <Entypo name="cross" size={24} color="black" />
            <Text className="text-lg ml-6">Create a post</Text>
          </View>
          <View className="mt-4">
            <TextInput
              placeholder="Add a title..."
              className="border-white p-2 rounded-xl bg-white"
              onChangeText={(e) => setForm({ ...form, title: e })}
            />
          </View>
          <View className="mt-4">
            <TextInput
              placeholder="Add a discription..."
              className="border-white p-2 rounded-xl bg-white"
              onChangeText={(e) => setForm({ ...form, description: e })}
              multiline
            />
          </View>
          <View className="bg-white mt-5 rounded-xl justify-center items-center">
            <TouchableOpacity
              className="items-center"
              onPress={() => openPicker("image")}
            >
              {form.image ? (
                <Image
                  source={{ uri: form.image.uri }}
                  className="w-full h-64 rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="justify-center items-center h-64">
                  <Entypo name="upload" size={50} color="black" />
                  <Text className="text-secondary font-semibold ">
                    Upload image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="bg-white mt-5 rounded-xl justify-center items-center">
            <TouchableOpacity
              className="items-center"
              onPress={() => openPicker("video")}
            >
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-72"
                  resizeMode={ResizeMode.COVER}
                  useNativeControls
                />
              ) : (
                <View className="justify-center items-center h-64">
                  <Entypo name="upload-to-cloud" size={50} color="black" />
                  <Text className="text-secondary font-semibold">
                    Upload video
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <CustomButton
              title="Post"
              otherStyle="bg-secondary"
              handlePress={() => submitPost()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
