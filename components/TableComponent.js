import React from "react"; 
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const TableComponent = () => {
  const tableData = [
    { job: "Software Engineer", location: "Ikeja" },
    { job: "Product Manager", location: "Festac" },
    { job: "Designer", location: "Igando" },
    { job: "Data Scientist", location: "Yaba" },
  ];

  return (
    <View style={tw`bg-[#1a1a1a] rounded-lg shadow-lg p-2`}>
      <View style={tw`flex-row border-b border-[#444] mb-1`}>
        <View style={tw`w-1/2 py-1`}>
          <Text style={tw`text-lg font-bold text-[#fff] text-center`}>Job</Text>
        </View>
        <View style={tw`w-1/2 py-1`}>
          <Text style={tw`text-lg font-bold text-[#fff] text-center`}>Location</Text>
        </View>
      </View>

      {tableData.map((row, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center border-b border-[#333] py-2 rounded-lg mb-1 bg-[#2a2a2a]`}
          onPress={() => alert(`Viewing details for ${row.job}`)}
        >
          <View style={tw`w-1/2`}>
            <Text style={tw`text-base text-[#f0f0f0] text-center`}>{row.job}</Text>
          </View>
          <View style={tw`w-1/2`}>
            <Text style={tw`text-base text-[#f0f0f0] text-center`}>{row.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TableComponent;
