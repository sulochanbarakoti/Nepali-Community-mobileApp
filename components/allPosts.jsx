import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { router } from "expo-router";
import ImageView from "react-native-image-viewing";
import Images from "../constants/images";

const AllPosts = ({ title, description, image, video, creator, avatar }) => {
  //   const [modelVisible, setModelVisible] = useState(false);

  const [play, setPlay] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const media = [
    { type: "image", uri: image },
    { type: "video", uri: video },
  ];
  const images = [
    {
      uri: image,
    },
  ];
  return (
    <View className="mx-3 mt-5">
      <View className="flex-row justify-between">
        <View className="flex-row justify-center items-center space-x-2">
          <Image
            source={{ uri: avatar }}
            className="w-10 h-10 rounded-full"
            resizeMode="contain"
          />
          <View>
            <Text className="text-lg font-semibold" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex-row items-center space-x-1">
              <MaterialCommunityIcons name="account" size={15} color="black" />
              <Text>{creator}</Text>
            </View>
          </View>
        </View>
        <View>
          <Entypo name="dots-two-vertical" size={24} color="black" />
        </View>
      </View>
      <View className="mt-3 mx-3 justify-center space-y-2">
        <View>
          <Text>{description}</Text>
        </View>
        <View className="flex-row space-x-1">
          {media.map((item, index) => (
            <View className="w-[50%] h-60" key={index}>
              {item.type === "image" ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => setIsVisible(true)}
                >
                  {visible ? (
                    <ImageView
                      images={images}
                      imageIndex={0}
                      visible={visible}
                      onRequestClose={() => setIsVisible(false)}
                    />
                  ) : (
                    <Image
                      source={{ uri: image }}
                      className="w-full h-60 rounded-xl mt-3 flex justify-center items-center"
                      resizeMode="cover"
                      onError={(e) => console.log(e.nativeEvent.error)}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity key={index} onPress={() => setPlay(true)}>
                  {/* <Video
                    source={{ uri: video }}
                    className="w-full h-full border-white border-2"
                    resizeMode="cover"
                    useNativeControls
                    onPlaybackStatusUpdate={(status) => {
                      if (status.didJustFinish) {
                        setPlay(false);
                      }
                    }}
                  /> */}
                  {/* {play ? ( */}
                  <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode="cover"
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                      if (status.didJustFinish) {
                        setPlay(false);
                      }
                    }}
                  />
                  {/* ) : ( */}
                  {/* <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setPlay(true)}
                      className="w-full h-60 rounded-xl mt-3 flex justify-center items-center"
                    >
                      <Image
                        activeOpacity={0.1}
                        source={Images.videoImage}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                      />
                    </TouchableOpacity> */}
                  {/* )} */}
                </TouchableOpacity>
              )}
            </View>
          ))}
          {/* {play ? (
            <Video
              source={{ uri: video }}
              className="w-full h-60 rounded-xl mt-3"
              resizeMode="cover"
              useNativeControls
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  setPlay(false);
                }
              }}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
              className="w-full h-60 rounded-xl mt-3 flex justify-center items-center"
            >
              <Image
                source={{ uri: image }}
                className="w-full h-full rounded-xl mt-3"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default AllPosts;
