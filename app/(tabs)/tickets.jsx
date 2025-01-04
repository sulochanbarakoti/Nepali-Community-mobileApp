import React, { use, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../redux/slices/ticketSlice";

const Tickets = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showQR, setShowQR] = useState(false);

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.ticket);
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  const findEvent = (eventId) => {
    return events.find((event) => event.$id === eventId);
  };

  // console.log(tickets);
  // console.log(events);
  const activeTickets = tickets.filter(
    (ticket) => new Date(tickets.eventDate) >= new Date()
  );
  const expiredTickets = tickets.filter(
    (ticket) => new Date(tickets.eventDate) < new Date()
  );

  const renderTickets = (tickets, isActive) => (
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
                {isActive ? (
                  <QRCode
                    value={JSON.stringify(
                      ticket.$id + ticket.eventId + ticket.boughtDate
                    )}
                    size={100}
                  />
                ) : null}
                <Text className="mt-2">
                  {isActive
                    ? "Scan this QR code at the event"
                    : "This ticket has expired"}
                </Text>
              </View>
            ) : null}
          </View>
        ))
      ) : (
        <Text className="text-lg text-center">
          {isActive ? "No active tickets" : "No expired tickets"}
        </Text>
      )}
    </ScrollView>
  );

  return (
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
        ? renderTickets(tickets, true)
        : renderTickets(tickets, false)}
    </SafeAreaView>
  );
};

export default Tickets;
