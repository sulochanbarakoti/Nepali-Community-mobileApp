import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

const TabIcon = ({ name }) => {
  let icon;
  switch (name) {
    case "Home":
      icon = <FontAwesome name="home" size={24} color="black" />;
      break;
    case "Profile":
      icon = <MaterialIcons name="account-circle" size={24} color="black" />;
      break;
    case "Create":
      icon = <Ionicons name="add-circle" size={24} color="black" />;
      break;
  }

  return (
    <View className="items-center justify-center">
      <View>{icon}</View>
      <Text className="font-bold">{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveBackgroundColor: "#CDCDE0",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#CDCDE0",
          // height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: () => <TabIcon name="Home" />,
        }}
      />
      <Tabs.Screen
        name="createPost"
        options={{
          headerShown: false,
          title: "Create Post",
          tabBarIcon: () => <TabIcon name="Create" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: () => <TabIcon name="Profile" />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
