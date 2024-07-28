import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
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
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

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
    const result = await ImagePicker.launchImageLibraryAsync({
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
      setUploading(true);
      await createPost({ ...form, userId: user.$id });
      setForm({
        title: "",
        description: "",
        image: null,
        video: null,
      });
      setUploading(false);
      Alert.alert("Success", "Post uploaded successfully");
      router.replace("home");
    } catch (error) {
      throw new Error(error);
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
          <View className="mt-5 space-y-3">
            <Text className="font-semibold">Upload Image:</Text>
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
                <View className="justify-center items-center h-64 bg-white w-full rounded-lg">
                  <Entypo name="upload" size={50} color="black" />
                  <Text className="text-secondary font-semibold ">
                    Upload image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className=" mt-5 space-y-3">
            <Text className="font-semibold">Upload Video:</Text>
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
                <View className="justify-center items-center h-64 bg-white w-full rounded-xl">
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
              otherStyle="bg-secondary my-2"
              handlePress={() => submitPost()}
            />
          </View>
          {uploading && (
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -50,
                marginTop: -50,
              }}
            >
              <ActivityIndicator size="large" color="#00ff00" />
              <Text>Uploading...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
