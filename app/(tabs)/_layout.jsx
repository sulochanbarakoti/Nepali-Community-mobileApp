import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const TabIcon = ({ name, focused }) => {
  let icon;
  const color = `${focused ? "#fafafa" : "#a6a5a2"}`;
  switch (name) {
    case "Home":
      icon = (
        <Ionicons
          name={`${focused ? "home" : "home-outline"}`}
          size={24}
          color={color}
        />
      );
      break;
    case "Profile":
      icon = (
        <MaterialCommunityIcons
          name={`${focused ? "account-circle" : "account-circle-outline"}`}
          size={24}
          color={color}
        />
      );
      break;
    case "Tickets":
      icon = (
        <Ionicons
          name={`${focused ? "ticket" : "ticket-outline"}`}
          size={24}
          color={color}
        />
      );
      break;
  }

  return (
    <View className="items-center justify-center ">
      <View>{icon}</View>
      <Text className={`${focused ? "text-white font-bold" : "text-gray-400"}`}>
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
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#1d161e",
        tabBarStyle: {
          backgroundColor: "#1d161e",
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
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
        name="tickets"
        options={{
          headerShown: true,
          title: "Tickets",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Tickets" focused={focused} />
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
