import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import tw from "twrnc";

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false); 
  const currentUser = auth().currentUser;

  const fetchJobs = async () => {
    setIsFetching(true); 
    try {
      const createdBySnapshot = await firestore()
        .collection("jobs")
        .where("createdBy", "==", currentUser.uid)
        .get();

      const assignedToSnapshot = await firestore()
        .collection("jobs")
        .where("assignedTo", "==", currentUser.uid)
        .get();

      const createdByJobs = createdBySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const assignedToJobs = assignedToSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const allJobs = [...createdByJobs, ...assignedToJobs];
      const activeJobs = allJobs.filter((job) => job.data.status !== "completed");

      setJobs(activeJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsFetching(false); 
    }
  };

  useEffect(() => {
    fetchJobs(); 

    const interval = setInterval(fetchJobs, 5000);

    return () => clearInterval(interval);
  }, []);

  const startJob = async (jobId) => {
    try {
      await firestore().collection("jobs").doc(jobId).update({
        startTime: new Date(),
      });
      fetchJobs();
    } catch (error) {
      console.error("Error starting job:", error);
    }
  };

  const finishJob = async (jobId) => {
    try {
      await firestore().collection("jobs").doc(jobId).update({
        finishTime: new Date(),
        status: "completed",
      });
      fetchJobs();
    } catch (error) {
      console.error("Error finishing job:", error);
    }
  };

  const cancelJob = async (jobId) => {
    try {
      await firestore().collection("jobs").doc(jobId).delete();
      fetchJobs();
    } catch (error) {
      console.error("Error canceling job:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
      <Text style={tw`text-lg font-semibold`}>{item.data.title || "No Title"}</Text>
      <Text style={tw`text-gray-600`}>{item.data.description || "No Description"}</Text>
      <Text style={tw`text-gray-600`}>Location: {item.data.location || "No Location"}</Text>
      <Text style={tw`text-gray-600`}>Price: {item.data.price || "No Price"}</Text>
      <Text style={tw`text-gray-600`}>
        Created by: {item.data.createdBy === currentUser.uid ? "You" : item.data.createdBy}
      </Text>
      <Text style={tw`text-gray-600`}>
        Assigned to: {item.data.assignedTo === currentUser.uid ? "You" : item.data.assignedTo}
      </Text>

      <View style={tw`flex flex-row justify-between mt-4`}>
        {item.data.startTime ? (
          <TouchableOpacity onPress={() => finishJob(item.id)} style={tw`rounded-lg w-full bg-[#000] p-2 `}>
            <Text style={tw`text-md font-semibold text-[#fff] text-center`}>Finish Job</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => startJob(item.id)} style={tw`rounded-lg w-1/2 bg-[#000] p-2 mx-1`}>
              <Text style={tw`text-md font-semibold text-[#fff] text-center`}>Start Job</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cancelJob(item.id)} style={tw`rounded-lg w-1/2 bg-[#fff] p-2 mx-1`}>
              <Text style={tw`text-md font-semibold text-[#000] text-center`}>Cancel Job</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 p-2 `}>
      {isFetching && (
        <View style={[tw`absolute inset-0 justify-center items-center`, { zIndex: 1 }]}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      )}

      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500`}>No jobs available</Text>
        }
      />
    </View>
  );
};

export default JobCard;
