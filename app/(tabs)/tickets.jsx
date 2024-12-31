import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";

const Tickets = () => {
  const [activeTab, setActiveTab] = useState("active");
  const { tickets } = useSelector((state) => state.ticket);

  const activeTickets = tickets.filter(
    (ticket) => new Date(ticket.eventDate) >= new Date()
  );
  const expiredTickets = tickets.filter(
    (ticket) => new Date(ticket.eventDate) < new Date()
  );

  const renderTickets = (tickets, isActive) => (
    <ScrollView className="p-4">
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <View key={index} className="bg-white p-4 rounded-md shadow-lg mb-4">
            <Text className="text-xl font-bold">{ticket.eventTitle}</Text>
            <Text className="text-lg">Date: {ticket.eventDate}</Text>
            <Text className="text-lg">Location: {ticket.eventLocation}</Text>
            <View className="mt-4 justify-center items-center">
              <QRCode value={JSON.stringify(ticket)} size={150} />
              <Text className="mt-2">
                {isActive
                  ? "Scan this QR code at the event"
                  : "This ticket has expired"}
              </Text>
            </View>
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
    <SafeAreaView className="h-full">
      <View className="flex-row justify-around bg-gray-200 p-2">
        <TouchableOpacity onPress={() => setActiveTab("active")}>
          <Text
            className={`text-lg ${activeTab === "active" ? "font-bold" : ""}`}
          >
            Active Tickets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("expired")}>
          <Text
            className={`text-lg ${activeTab === "expired" ? "font-bold" : ""}`}
          >
            Expired Tickets
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "active"
        ? renderTickets(activeTickets, true)
        : renderTickets(expiredTickets, false)}
    </SafeAreaView>
  );
};

export default Tickets;
