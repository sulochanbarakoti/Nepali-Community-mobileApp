import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Data: ${data}`);
    // Process the scanned data here
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="h-full justify-center items-center">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }}
      />
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          className="bg-primary p-4 rounded-md mt-4"
        >
          <Text className="text-white text-center text-lg">
            Tap to Scan Again
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default QRScanner;
