import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const Card = ({ children, title }) => {
  return (
    <View style={tw`bg-white p-3.2`}>
      {title && <Text style={tw`text-lg font-bold mb-2`}>{title}</Text>}
      {children}
    </View>
  );
};

export default Card;
