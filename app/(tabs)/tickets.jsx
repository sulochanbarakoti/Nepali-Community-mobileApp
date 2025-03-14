import React, { use, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../redux/slices/ticketSlice";
import QRScanner from "../qrScanner";

const Tickets = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showQR, setShowQR] = useState(null);

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch, tickets]);

  const filterTickets = (tickets) => {
    return tickets.filter((ticket) => ticket.user?.$id === user?.$id);
  };

  const findEvent = (eventId) => {
    return events.find((event) => event?.$id === eventId);
  };

  const activeTickets = (tickets) => {
    return tickets.filter((ticket) => {
      const eventDate = new Date(ticket.eventDate); // Convert to Date object
      const today = new Date(); // Current date
      return (
        ticket.scanned === false && ticket.expired === false
        // eventDate >= today // Check if event date is today or in the future
      );
    });
  };

  const expiredTickets = (tickets) => {
    return tickets.filter((ticket) => {
      const eventDate = new Date(ticket.eventDate); // Convert to Date object
      const today = new Date(); // Current date
      return (
        ticket.scanned === true || // Already scanned tickets
        ticket.expired === true // Explicitly marked as expired
        // eventDate < today // Event date is in the past
      );
    });
  };

  const renderTickets = (tickets) => (
    <ScrollView className="p-4">
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <View key={index} className="bg-white p-4 rounded-md shadow-lg mb-4">
            <View key={index} className="flex-row justify-between">
              <View>
                <Text className="text-xl font-bold">
                  {findEvent(ticket.eventId).eventTitle}
                </Text>
                <Text className="text-lg">
                  Date: {findEvent(ticket.eventId).eventDate}
                </Text>
                <Text className="text-lg">
                  Location: {findEvent(ticket.eventId).eventLocation}
                </Text>
              </View>
              <View className="justify-center items-center">
                <TouchableOpacity
                  className="bg-gray-300 p-2 rounded-md"
                  onPress={() =>
                    setShowQR(showQR === ticket.$id ? null : ticket.$id)
                  }
                  disabled={ticket.scanned}
                >
                  <Text className="font-bold">QR Code</Text>
                  <Text>Show QR</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showQR === ticket.$id ? (
              <View className="mt-4 justify-center items-center">
                <QRCode value={JSON.stringify(ticket.$id)} size={100} />
                <Text className="mt-2">Scan this QR code at the event</Text>
              </View>
            ) : null}
          </View>
        ))
      ) : (
        <Text className="text-lg text-center">
          {/* {isActive ? "No active tickets" : "No expired tickets"} */}
        </Text>
      )}
    </ScrollView>
  );

  return (
    <>
      {!user?.isAdmin ? (
        <SafeAreaView className="h-full px-5">
          <View className="flex-row justify-around bg-white p-2">
            <TouchableOpacity onPress={() => setActiveTab("active")}>
              <Text
                className={`text-lg ${
                  activeTab === "active" ? "font-bold underline" : ""
                }`}
              >
                Active Tickets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("expired")}>
              <Text
                className={`text-lg ${
                  activeTab === "expired" ? "font-bold underline" : ""
                }`}
              >
                Expired Tickets
              </Text>
            </TouchableOpacity>
          </View>
          {activeTab === "active"
            ? renderTickets(filterTickets(activeTickets(tickets)))
            : renderTickets(filterTickets(expiredTickets(tickets)))}
        </SafeAreaView>
      ) : (
        <QRScanner />
      )}
    </>
  );
};

export default Tickets;
