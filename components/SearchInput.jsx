import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleSearch,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className="w-full h-16 px-4 bg-white  rounded-2xl border-2 border-secondary focus:border-black-100 flex-row items-center space-x-4"
      style={{ ...otherStyles }}
    >
      <TextInput
        className="text-base mt-0.5 text-gray-100 flex-1 font-pregular"
        value={value}
        placeholder={"Rechercher un infirmier!"}
        placeholderTextColor="black"
        onChangeText={handleSearch}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity onPress={handleSearch}>
        <MaterialIcons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
