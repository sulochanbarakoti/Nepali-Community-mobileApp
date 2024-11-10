import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";
import { Redirect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn) return <Redirect href="sign-in" />;
  const LogOut = async () => {
    dispatch(logoutUser());
  };
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        {user ? (
          <View className="h-full space-y-5">
            <View className=" mt-4 justify-center items-center">
              <View className=" w-[95%] h-[200px] justify-center bg-white items-center rounded-2xl space-y-2">
                <Image
                  source={{ uri: user.username?.avatar }}
                  className="w-[150px] h-[150px] rounded-full"
                  resizeMode="cover"
                />
                <Text className="text-xl font-bold">@{user?.username}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text className="text-lg font-bold ml-2">Profile Setting</Text>
              </View>
              <View className="justify-center items-center">
                <View className="bg-primary h-[180px] w-[95%] rounded-xl justify-center items-center space-y-2">
                  <View className="w-[95%] h-12 px-4 bg-gray-50 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      className="w-full"
                      placeholder="First name"
                      editable={false}
                    />
                  </View>
                  <View className="w-[95%] h-12 px-4 bg-gray-50 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      className="w-full"
                      placeholder="Last name"
                      editable={false}
                    />
                  </View>
                  <View className="w-[95%] h-12 px-4 bg-gray-50 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      className="w-full"
                      placeholder="email@gmeil.com"
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text className="text-lg font-bold ml-2">Security</Text>
              </View>
              <View className="justify-center items-center">
                <View className="bg-primary h-[130px] w-[95%] rounded-xl justify-center items-center space-y-2">
                  <View className="w-[95%] h-12 px-4 bg-gray-50 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      className="w-full"
                      placeholder="old password"
                      editable={false}
                    />
                  </View>
                  <View className="w-[95%] h-12 px-4 bg-gray-50 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      className="w-full"
                      placeholder="new password"
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View className="justify-center items-center">
              <CustomButton
                title="Log Out"
                otherStyle="bg-red-700 w-[40%] mb-3"
                handlePress={() => LogOut()}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
