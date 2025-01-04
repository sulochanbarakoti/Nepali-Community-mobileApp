import React, { useState } from "react";
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
// import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { storeTicket } from "../redux/slices/ticketSlice";

const EventPage = () => {
  const { event } = useLocalSearchParams();
  const eventDetails = event ? JSON.parse(event) : null;
  const [ticketCount, setTicketCount] = useState(1);
  // const [qrValue, setQrValue] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleBuyTicket = () => {
    if (user) {
      const ticketInfo = {
        eventId: eventDetails.$id,
        userId: user.$id,
        boughtDate: new Date().toISOString(),
      };
      dispatch(storeTicket(ticketInfo));
      // setQrValue(JSON.stringify(ticketInfo));
      Alert.alert("Success", "Ticket purchased successfully!");
      // Redirect("home");
    } else {
      Alert.alert("Error", "You need to be logged in to buy tickets.");
    }
  };

  const incrementTicketCount = () => {
    setTicketCount(ticketCount + 1);
  };

  const decrementTicketCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
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
          <View className="mt-4">
            <Text className="text-lg">Number of Tickets:</Text>
            <View style={styles.ticketCounter}>
              <TouchableOpacity
                onPress={decrementTicketCount}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                value={ticketCount.toString()}
                onChangeText={(text) => setTicketCount(Number(text))}
                keyboardType="numeric"
                style={styles.ticketInput}
              />
              <TouchableOpacity
                onPress={incrementTicketCount}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleBuyTicket}
            className="bg-primary p-4 rounded-md mt-4"
          >
            <Text className="text-white text-center text-lg">Buy Ticket</Text>
          </TouchableOpacity>
          {/* {qrValue ? (
          <View className="mt-4 justify-center items-center">
            <QRCode value={qrValue} size={200} />
            <Text className="mt-2">Scan this QR code at the event</Text>
          </View>
        ) : null} */}
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
