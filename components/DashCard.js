import React from "react";
import { View, Text } from "react-native";
import Card from "./Card";
import tw from "twrnc";

const Dashboard = () => {
  return (
    <View style={tw`flex-1 bg-[#fff] `}>
      <View style={tw`flex-row flex-wrap -m-2`}>
        <View style={tw`w-1/2 bg-[#fff]`}>
          <Card title="Overview">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Total
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>
                1,234
              </Text>
            </View>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Active Users
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>567</Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2 `}>
          <Card title="Performance">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Page Views
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>
                12,345
              </Text>
            </View>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Bounce Rate
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>34%</Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2 `}>
          <Card title="Sales">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Total Sales
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>
                $8,900
              </Text>
            </View>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Revenue
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>
                $25,000
              </Text>
            </View>
          </Card>
        </View>

        <View style={tw`w-1/2`}>
          <Card title="User Growth">
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                New Users
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>300</Text>
            </View>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`text-base font-semibold text-gray-700`}>
                Churn Rate
              </Text>
              <Text style={tw`text-base font-semibold text-gray-800`}>5%</Text>
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
