import React from "react";
import { View, Text } from "react-native";
import Card from "./Card";
import tw from "twrnc";

const Dashboard = () => {
  return (
    <View style={tw`flex-1 bg-gray-100 `}>
      <View style={tw`flex-row flex-wrap `}>
        <View style={tw`w-1/2 border border-[#36013f] `}>
          <Card title="Overview">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold`}>Total</Text>
              <Text style={tw`text-base`}>1,234</Text>
            </View>
            <View style={tw`flex-row justify-between `}>
              <Text style={tw`text-base font-bold`}>Active Users</Text>
              <Text style={tw`text-base`}>567</Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2 border border-[#36013f]`}>
          <Card title="Performance">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold`}>Page Views</Text>
              <Text style={tw`text-base`}>12,345</Text>
            </View>
            <View style={tw`flex-row justify-between `}>
              <Text style={tw`text-base font-bold`}>Bounce Rate</Text>
              <Text style={tw`text-base`}>34%</Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2 border border-[#36013f]`}>
          <Card title="Sales">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold`}>Total Sales</Text>
              <Text style={tw`text-base`}>$8,900</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold`}>Revenue</Text>
              <Text style={tw`text-base`}>$25,000</Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2 border border-[#36013f]`}>
          <Card title="User Growth">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold`}>New Users</Text>
              <Text style={tw`text-base`}>300</Text>
            </View>
            <View style={tw`flex-row justify-between `}>
              <Text style={tw`text-base font-bold`}>Churn Rate</Text>
              <Text style={tw`text-base`}>5%</Text>
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
