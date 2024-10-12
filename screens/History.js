import React, { useState, useEffect } from "react"; 
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import tw from "twrnc";
import * as Icon from "react-native-feather";

const History = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const snapshot = await firestore()
          .collection("jobs")
          .where("createdBy", "==", currentUser.uid)
          .get();

        const assignedSnapshot = await firestore()
          .collection("jobs")
          .where("assignedTo", "==", currentUser.uid)
          .get();

        const createdJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const assignedJobs = assignedSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

       
        const userSnapshot = await firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get();

        const userCategory = userSnapshot.exists ? userSnapshot.data().category : "Unknown";

       
        const allJobs = [...createdJobs, ...assignedJobs].map(job => ({
          ...job,
          assignedTo: job.assignedTo === currentUser.uid ? userCategory : job.assignedTo,
        }));

        setHistoryData(allJobs);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentUser]);

  if (loading) {
    return <Text style={tw`text-center text-gray-500`}>Loading...</Text>;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={tw`bg-white p-4 mb-4 rounded shadow-md`}
    >
      <Text style={tw`font-bold text-lg ml-2 mb-2`}>{item.title}</Text>
      <View
        style={tw`bg-[#000] flex flex-row justify-between items-center rounded-lg p-4`}
      >
        <Text style={tw`text-xl font-bold text-white`}>
          Location: {item.location}
        </Text>
        <Text style={tw`text-white`}>Status: {item.status}</Text>
      </View>
      <Text style={tw`text-gray-600`}>Price: {item.price}</Text>
      <Text style={tw`text-gray-600`}>
        Created by: {item.createdBy === currentUser.uid ? "You" : item.createdBy}
      </Text>
      <Text style={tw`text-gray-600`}>
        Assigned to: {item.assignedTo === currentUser.uid ? userCategory : item.assignedTo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-[#fff]`}>
      <View style={tw`bg-[#000] p-4`}>
        <View style={tw`flex-row justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`bg-[#000] rounded-md p-2`}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.ArrowLeft strokeWidth={2} stroke={"#fff"} />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center p-2`}>
            <Text style={tw`font-semibold text-lg text-center text-[#fff]`}>
              History
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-[#000] rounded-md p-2`}
            activeOpacity={0.7}
            onPress={() => console.log("Log out action")}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.LogOut strokeWidth={2} stroke={"#000"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        ListEmptyComponent={<Text>No job history available.</Text>}
      />
    </View>
  );
};

export default History;
