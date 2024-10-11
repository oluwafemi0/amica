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
    <View style={tw`bg-[#fff]`}>
      
      <View style={tw`flex-row border-b-2 border-[#000] mb-1`}>
        <Text style={tw`w-1/2 text-lg font-bold text-[#000] text-center`}>Job</Text>
        <Text style={tw`w-1/2 text-lg font-bold text-[#000] text-center`}>Location</Text>
      </View>

     

      {tableData.map((row, index) => (
        <View
          key={index}
          style={tw`flex-row items-center border-b border-gray-200 py-1`}
        >
          <TouchableOpacity
            style={tw`w-2/2 bg-[#000] rounded-md py-1 border border-[#000] flex-row `}
            onPress={() => alert(`Viewing description for ${row.job}`)}
          >
          <Text style={tw`w-1/2 text-base text-[#fff] text-center`}>{row.job}</Text>
          <Text style={tw`w-1/2 bg-[#fff] rounded-tl-lg  rounded-bl-lg text-base text-[#000] text-center`}>{row.location}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TableComponent;
