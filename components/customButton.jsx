import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, otherStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={` border border-white rounded-2xl h-[50px] justify-center items-center ${otherStyle}`}
      onPress={handlePress}
    >
      <Text className="text-white text-2xl font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
