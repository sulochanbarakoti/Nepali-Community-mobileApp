import { View, Text, TouchableOpacity } from "react-native";

const EventDetails = ({ event }) => {
  return (
    <View className="bg-gray-200 p-4 rounded-md shadow-lg">
      <Text className="text-xl font-bold mb-4">{event.title}</Text>
      <Text className="text-base mb-4">{event.details}</Text>
      <Text className="text-base mb-4">Date: {event.date}</Text>
      <Text className="text-base mb-4">Time: {event.time}</Text>
      <Text className="text-base mb-4">Location: {event.location}</Text>
      <TouchableOpacity className="p-2 border-2 border-secondary rounded-md self-start">
        <Text>Join Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;
