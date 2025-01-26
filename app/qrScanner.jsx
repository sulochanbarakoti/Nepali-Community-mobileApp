import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // Correct import
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { data } from "autoprefixer";

const QRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (permission?.status === "denied") {
      Alert.alert("Camera permission denied", "Please grant camera access.");
    }
  }, [permission]);

  // Handle barcode scanning
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Data: ${data}`);
    Redirect("home"); // Redirect to home page
  };

  // Request permission if not granted yet
  if (permission?.status === "undetermined") {
    requestPermission();
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      {permission?.granted === false ? (
        <View className="flex-1 justify-center items-center">
          <Text>No access to camera</Text>
          <TouchableOpacity
            className="bg-blue-500 p-2 rounded-lg mt-4"
            onPress={requestPermission}
          >
            <Text className="text-white">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-11/12 h-3/4 rounded-lg">
          {/* Use CameraView for barcode scanning */}
          <CameraView
            style={{ flex: 1 }} // Ensure the camera view fills the space
            onBarCodeScanned={({ data }) => {
              console.log(data);
            }} // Scanning logic
            // barCodeScannerSettings={{
            //   // Add barcode scanner settings
            //   barCodeTypes: ["qr"], // Specify QR codes to scan
            // }}
          />
          {/* Overlay */}
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
            <View className="w-64 h-64 border-4 border-white  bg-opacity-8"></View>
          </View>
        </View>
      )}
      {/* {scanned && (
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-lg mt-4"
          onPress={() => setScanned(false)}
        >
          <Text className="text-white">Scan Again</Text>
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );
};

export default QRScanner;
