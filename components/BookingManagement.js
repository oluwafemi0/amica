import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import tw from "twrnc";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = auth().currentUser;

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const bookingSnapshot = await firestore()
        .collection("bookings")
        .get();

      const bookingsData = bookingSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const placeBid = async (bookingId, bidAmount) => {
    try {
      await firestore().collection("bookings").doc(bookingId).update({
        bids: firestore.FieldValue.arrayUnion({
          userId: currentUser.uid,
          amount: bidAmount,
          placedAt: new Date(),
        }),
      });
      fetchBookings();
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const acceptBid = async (bookingId, bid) => {
    try {
      await firestore().collection("bookings").doc(bookingId).update({
        acceptedBid: bid,
        status: "accepted",
        acceptedAt: new Date(),
      });
      fetchBookings();
    } catch (error) {
      console.error("Error accepting bid:", error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await firestore().collection("bookings").doc(bookingId).update({
        status: "canceled",
        canceledAt: new Date(),
      });
      fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={tw`bg-[#2a2a2a] p-4 rounded-lg mb-4`}>
      <Text style={tw`text-lg font-semibold text-[#f0f0f0]`}>
        {item.data.title || "No Title"}
      </Text>
      <Text style={tw`text-gray-400`}>
        Description: {item.data.description || "No Description"}
      </Text>
      <Text style={tw`text-gray-400`}>
        Date: {item.data.date || "No Date"}
      </Text>
      <Text style={tw`text-gray-400`}>
        Status: {item.data.status || "Pending"}
      </Text>

      {item.data.bids && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-400 mb-2`}>Bids:</Text>
          {item.data.bids.map((bid, index) => (
            <View key={index} style={tw`bg-[#3a3a3a] p-2 rounded-lg mb-2`}>
              <Text style={tw`text-[#fff]`}>Bid Amount: {bid.amount}</Text>
              <Text style={tw`text-gray-400`}>
                Placed by: {bid.userId === currentUser.uid ? "You" : bid.userId}
              </Text>
              <TouchableOpacity
                onPress={() => acceptBid(item.id, bid)}
                style={tw`mt-2 rounded-lg bg-[#4CAF50] p-2`}
              >
                <Text style={tw`text-center text-[#fff]`}>Accept Bid</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={tw`flex flex-row justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => placeBid(item.id, 100)} // Example bid amount
          style={tw`rounded-lg w-1/2 bg-[#2196F3] p-2 mx-1`}
        >
          <Text style={tw`text-md font-semibold text-[#fff] text-center`}>
            Place Bid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => cancelBooking(item.id)}
          style={tw`rounded-lg w-1/2 bg-[#f44336] p-2 mx-1`}
        >
          <Text style={tw`text-md font-semibold text-[#fff] text-center`}>
            Cancel Booking
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 p-2 bg-[#fff]`}>
      {isLoading && (
        <View style={[tw`absolute inset-0 justify-center items-center`, { zIndex: 1 }]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500`}>
            No bookings available
          </Text>
        }
      />
    </View>
  );
};

export default BookingManagement;
