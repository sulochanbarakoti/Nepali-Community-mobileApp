import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const FormField = ({
  title,
  otherStyle,
  value,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <View className="border-2 w-full h-12 px-4 bg-gray-200 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 font-semibold text-base w-full"
          placeholder={title}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FontAwesome name="eye-slash" size={20} color="black" />
            ) : (
              <FontAwesome name="eye" size={20} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
