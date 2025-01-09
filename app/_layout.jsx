import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../global.css";

const Layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="eventPage" options={{ title: "Event Page" }} />
        <Stack.Screen name="qrScanner" options={{ title: "QR Scanner" }} />
        <Stack.Screen name="createEvent" options={{ title: "Create Event" }} />
      </Stack>
    </Provider>
  );
};

export default Layout;
