import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import { getAllTickets, storeTicket } from "../redux/slices/ticketSlice";
import { updateSoldTicket } from "../redux/slices/eventSlice";
import { useRouter } from "expo-router";

const EventPage = () => {
  const { event } = useLocalSearchParams();
  const eventDetails = event ? JSON.parse(event) : null;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { tickets } = useSelector((state) => state.ticket);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  const handleBuyTicket = () => {
    if (user) {
      const ticketInfo = {
        eventId: eventDetails.$id,
        userId: user.$id,
        boughtDate: new Date().toISOString(),
      };
      // console.log(eventDetails.$id);
      // console.log(tickets[0].user.$id);
      const response = tickets.filter(
        (ticket) =>
          ticket.eventId === eventDetails.$id && ticket.user.$id === user.$id
      );
      console.log(response);
      if (response.length > 0) {
        Alert.alert(
          "Error",
          "You have already purchased a ticket for this event."
        );
        return;
      }

      dispatch(storeTicket(ticketInfo));
      dispatch(updateSoldTicket(eventDetails));
      Alert.alert("Success", "Ticket purchased successfully!");
      router.push("home");
    } else {
      Alert.alert("Error", "You need to be logged in to buy tickets.");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="bg-white p-4 rounded-md shadow-lg">
          <Image
            source={{
              uri: "https://www.beyondthelimitstreks.com/uploads/img/Crazy%20Festival%20in%20Nepal.jpg",
            }}
            className="w-full h-64 rounded-md"
            resizeMode="cover"
          />
          <Text className="text-2xl font-bold mt-4">
            {eventDetails.eventTitle}
          </Text>
          <Text className="text-lg mt-2">{eventDetails.eventDescription}</Text>
          <Text className="text-lg mt-2">Date: {eventDetails.eventDate}</Text>
          <Text className="text-lg mt-2">Time: {eventDetails.eventDate}</Text>
          <Text className="text-lg mt-2">
            Location: {eventDetails.eventLocation}
          </Text>
          <TouchableOpacity
            onPress={handleBuyTicket}
            className="bg-primary p-4 rounded-md mt-4"
          >
            <Text className="text-white text-center text-lg">Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ticketCounter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  counterButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  counterButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  ticketInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
    width: 50,
  },
});

export default EventPage;
