import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

const QRScanner = () => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  // const [facing, setFacing] = useState < CameraType > "back";

  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // requestPermission();
    // (async () => {
    //   const { status } = await Camera.requestCameraPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
  }, []);

  // const handleBarCodeScanned = ({ data }) => {
  //   setScanned(true);
  //   Alert.alert("QR Code Scanned", `Data: ${data}`);
  //   // Handle scanned data here
  // };

  // if (hasPermission === null) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center">
  //       <Text>Requesting camera permission...</Text>
  //     </SafeAreaView>
  //   );
  // }

  // if (!permission?.granted) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center">
  //       <Text className="text-black">No access to camera</Text>
  //       <TouchableOpacity
  //         className="bg-blue-500 p-2 rounded-lg mt-4"
  //         onPress={requestPermission}
  //       >
  //         <Text className="text-black">Grant Permission</Text>
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-11/12 h-3/4  rounded-lg">
        <CameraView
          facing="back"
          onBarcodeScanned={({ data }) => {
            setScanned(true);
            Alert.alert("QR Code Scanned", `Data: ${data}`);
          }}
        />
      </View>
      {/* <Text className="text-black">No access to camera</Text> */}
      {scanned && (
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-lg mt-4"
          onPress={() => setScanned(false)}
        >
          <Text className="text-white">Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default QRScanner;
