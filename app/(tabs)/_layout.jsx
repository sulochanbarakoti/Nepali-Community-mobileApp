import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

const TabIcon = ({ name, focused }) => {
  let icon;
  const color = focused ? "blue" : "#000";
  switch (name) {
    case "Home":
      icon = <FontAwesome name="home" size={24} color={color} />;
      break;
    case "Profile":
      icon = <MaterialIcons name="account-circle" size={24} color={color} />;
      break;
    case "Create":
      icon = <Ionicons name="add-circle" size={24} color={color} />;
      break;
  }

  return (
    <View className="items-center justify-center ">
      <View>{icon}</View>
      <Text
        className={`${focused ? "border-b-2 border-primary" : ""} font-bold`}
      >
        {name}
      </Text>
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
          backgroundColor: "#CDCDE0",
          // borderTopWidth: 2,
          borderTopColor: "#CDCDE0",
          // height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="createPost"
        options={{
          headerShown: false,
          title: "Create Post",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Create" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
