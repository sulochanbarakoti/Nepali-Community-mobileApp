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
        <MaterialCommunityIcons
          name={focused ? "scan-helper" : "qrcode-scan"}
          size={24}
          color={color}
        />
      );
      break;
    default:
      break;
  }

  return (
    <View className="flex  items-center">
      <View className="mt-1">{icon}</View>
      <View>
        <Text
          className={`text-xs mt-1 w-full ${
            focused ? "text-white font-bold" : "text-gray-400"
          }`}
        >
          {name}
        </Text>
      </View>
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
          height: Platform.OS === "android" ? 60 : 75,
          paddingBottom: Platform.OS === "android" ? 5 : 8,
          paddingBottom: 8,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={`${user?.isAdmin ? "Scan" : "Tickets"}`}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
