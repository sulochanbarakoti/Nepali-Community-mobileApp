import React from "react";
import { Tabs } from "expo-router";
import { Text, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const TabIcon = ({ name, focused }) => {
  let icon;
  const color = focused ? "#fafafa" : "#a6a5a2";

  switch (name) {
    case "Home":
      icon = (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={24}
          color={color}
        />
      );
      break;
    case "Profile":
      icon = (
        <MaterialCommunityIcons
          name={focused ? "account-circle" : "account-circle-outline"}
          size={24}
          color={color}
        />
      );
      break;
    case "Tickets":
      icon = (
        <Ionicons
          name={focused ? "ticket" : "ticket-outline"}
          size={24}
          color={color}
        />
      );
      break;
    case "Scan":
      icon = (
        <Ionicons
          name={focused ? "scan-outline" : "scan-sharp"}
          size={24}
          color={color}
        />
      );
      break;
    default:
      break;
  }

  return (
    <View className="items-center">
      <View className="mt-1">{icon}</View>
      <Text
        className={`text-xs mt-1 w-full ${
          focused ? "text-white font-bold" : "text-gray-400"
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1d161e",
          height: Platform.OS === "android" ? 60 : 75, // Adjust height for Android
          paddingBottom: Platform.OS === "android" ? 5 : 8, // Reduce Android padding
          paddingBottom: 8,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          // title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          headerShown: false,
          // title: "Tickets",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={`${user.isAdmin ? "Scan" : "Tickets"}`}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          // title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
