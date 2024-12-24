import React from "react";
import { Stack } from "expo-router";
import GlobalProvider from "../context/globalProvider";
import { Provider } from "react-redux";
import store from "../redux/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="eventDetailsPage"
            options={{ title: "Event Details" }}
          />
        </Stack>
      </GlobalProvider>
    </Provider>
  );
};

export default Layout;
