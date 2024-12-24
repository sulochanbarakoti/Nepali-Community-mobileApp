import { SafeAreaView } from "react-native";
import EventDetails from "../components/eventDetails";
import { useLocalSearchParams } from "expo-router";

const EventDetailsPage = () => {
  const { event } = useLocalSearchParams();
  const eventDetails = event ? JSON.parse(event) : null;

  return (
    <SafeAreaView className="h-full p-4">
      <EventDetails event={eventDetails} />
    </SafeAreaView>
  );
};

export default EventDetailsPage;
