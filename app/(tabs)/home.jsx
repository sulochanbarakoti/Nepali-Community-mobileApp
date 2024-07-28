import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import images from "../../constants/images";
import AllPosts from "../../components/allPosts";

const Home = () => {
  const [postData, setPostData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const allPosts = async () => {
    const data = await getAllPost();
    setPostData(data);
    console.log(data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    allPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={postData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <AllPosts
            title={item.title}
            description={item.description}
            image={item.image}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-center mx-5 mt-5">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold">Welcome, </Text>
              <Text className="font-semibold text-lg text-secondary">
                {user?.username}
              </Text>
            </View>
            <Image source={images.pngLogo} className="w-12 h-12" />
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>helo</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
