import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import tw from 'twrnc';

const BiddingSystem = ({ jobId }) => {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const currentUser = auth().currentUser;

  const fetchBids = async () => {
    setIsFetching(true);
    try {
      const snapshot = await firestore()
        .collection('bids')
        .where('jobId', '==', jobId)
        .get();
      
      const fetchedBids = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setBids(fetchedBids);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setIsFetching(false);
    }
  };

 
  const handleBidSubmit = async () => {
    const amount = parseFloat(bidAmount);
    if (!bidAmount || isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
      return;
    }

    setIsSubmitting(true);

    try {
      await firestore().collection('bids').add({
        jobId,
        userId: currentUser.uid,
        bidAmount: amount,
        timestamp: new Date(),
      });
      setBidAmount('');
      Alert.alert('Bid Submitted', 'Your bid has been submitted successfully!');
      fetchBids(); 
    } catch (error) {
      console.error('Error submitting bid:', error);
      Alert.alert('Error', 'There was an error submitting your bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBids(); 
    
    const interval = setInterval(fetchBids, 5000);
    return () => clearInterval(interval);
  }, [jobId]);

  const renderBidItem = ({ item }) => (
    <View style={tw`p-2 border-b border-gray-200`}>
      <Text style={tw`text-lg font-semibold`}>{`Bid by User ${item.userId}: $${item.bidAmount}`}</Text>
      <Text style={tw`text-gray-600`}>{`Submitted on: ${item.timestamp.toDate().toLocaleString()}`}</Text>
    </View>
  );

  return (
    <View style={tw`p-4 bg-white rounded-lg shadow`}>
      <TextInput
        value={bidAmount}
        onChangeText={setBidAmount}
        placeholder="Enter your bid amount"
        keyboardType="numeric"
        style={tw`border p-2 rounded-lg mb-4`}
      />
      <TouchableOpacity
        onPress={handleBidSubmit}
        disabled={isSubmitting}
        style={tw`p-2 rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'}`}
      >
        <Text style={tw`text-white text-center text-lg`}>
          {isSubmitting ? 'Submitting...' : 'Place Bid'}
        </Text>
      </TouchableOpacity>

      {isFetching ? (
        <ActivityIndicator size="large" color="#000" style={tw`mt-4`} />
      ) : (
        <FlatList
          data={bids}
          renderItem={renderBidItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={tw`text-center text-gray-500 mt-4`}>No bids available</Text>}
        />
      )}
    </View>
  );
};

export default BiddingSystem;
