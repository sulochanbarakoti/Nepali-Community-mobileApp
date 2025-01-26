import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { markTicketAsUsed } from "../redux/slices/ticketSlice"; // Ensure you have this action in your ticket slice

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.ticket);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Data: ${data}`);
    // Process the scanned data here
    const ticket = tickets.find((ticket) => ticket.$id === data);
    if (ticket) {
      dispatch(markTicketAsUsed(ticket.$id));
      Alert.alert("Success", "Ticket marked as used");
    } else {
      Alert.alert("Error", "Invalid ticket");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-11/12 h-3/4 overflow-hidden rounded-lg bg-black">
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          className="absolute inset-0"
        />
      </View>
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          className="mt-4 p-4 bg-blue-500 rounded-lg"
        >
          <Text className="text-white text-lg text-center">
            Tap to Scan Again
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default QRScanner;
