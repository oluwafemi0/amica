import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const TableComponent = () => {
  const tableData = [
    { job: "Software Engineer", location: "New York" },
    { job: "Product Manager", location: "San Francisco" },
    { job: "Designer", location: "Los Angeles" },
    { job: "Data Scientist", location: "Chicago" },
  ];

  return (
    <View style={tw`p-1.5`}>
      <View style={tw`flex-row border-b-2 border-[#36013f] `}>
        <Text style={tw`w-1/3 text-lg font-bold text-[#36013f] text-center`}>Job</Text>
        <Text style={tw`w-1/3 text-lg font-bold text-[#36013f] text-center`}>Location</Text>
        <Text style={tw`w-1/3 text-lg font-bold text-[#36013f] text-center`}>Details</Text>
      </View>

      {tableData.map((row, index) => (
        <View
          key={index}
          style={tw`flex-row items-center border-b border-gray-200 py-1`}
        >
          <Text style={tw`w-1/3 text-[#36013f] text-center`}>{row.job}</Text>
          <Text style={tw`w-1/3 text-[#36013f] text-center`}>{row.location}</Text>
          <TouchableOpacity
            style={tw`w-1/3 bg-[#fff] rounded-md p-1.5 border-2 border-[#36013f]`}
            onPress={() => alert(`Viewing description for ${row.job}`)}
          >
            <Text style={tw`text--[#36013f] text-center`}>View </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TableComponent;
