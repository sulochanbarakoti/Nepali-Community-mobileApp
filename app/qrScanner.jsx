import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { markTicketAsUsed } from "../redux/slices/ticketSlice";
import { router } from "expo-router";

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    dispatch(markTicketAsUsed(data));
    // console.log(`Barcode type: ${type}, data: ${data}`);
    router.push("/home");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // Camera view
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {/* QR code scanning overlay */}
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <View className="w-64 h-64 border-4 border-white bg-opacity-50"></View>
        </View>
      </View>
      {/* Button to scan again */}
      {scanned && (
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-lg my-4 mx-5"
          onPress={() => setScanned(false)}
        >
          <Text className="text-white text-center">Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
