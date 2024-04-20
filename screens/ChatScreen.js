import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import tw from "twrnc";

const ChatScreen = ({ route }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const currentUser = auth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatId = [currentUser.uid, user.id].sort().join("");
        const messagesSnapshot = await firestore()
          .collection("chats")
          .doc(chatId)
          .collection("messages")
          .orderBy("createdAt", "asc")
          .get();

        const fetchedMessages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const chatId = [currentUser.uid, user.id].sort().join("");
    const unsubscribe = firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    try {
      const chatId = [currentUser.uid, user.id].sort().join("");
      await firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add({
          text: textMessage,
          from: currentUser.uid,
          to: user.id,
          createdAt: new Date(),
        });
      setTextMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isSent = item.data.from === currentUser.uid;

    return (
      <View style={[tw`bg-gray-200 px-4 py-2 mb-2 rounded-xl max-w-[60%]`, isSent ? tw`self-end bg-blue-500` : tw`self-start`]}>
        <Text style={isSent ? tw`text-white` : tw`text-black`}>{item.data.text}</Text>
        <Text style={[tw`text-xs text-gray-400 mt-1`, isSent ? tw`text-right` : tw`text-left`]}>
          {formatDate(item.data.createdAt)}
        </Text>
      </View>
    );
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date.toDate()).toLocaleDateString(undefined, options);
  }

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`mb-4 items-center`}>
        <Image
          style={tw`w-18 h-18 rounded-full mb-2`}
          source={{ uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${user.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e` }}
        />
        <Text style={tw`text-xl font-bold`}>{user.data.categories}</Text>
        <Text style={tw` `}>{user.data.category}</Text>
        <Text>{user.data.location}</Text>
      </View>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`flex-grow`}
          
          showsVerticalScrollIndicator={false}
        />
        <View style={tw`flex-row items-center mt-4`}>
          <TextInput
            style={tw`flex-1 p-2 bg-gray-200 rounded-lg mr-2`}
            placeholder="Type a message"
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
          <TouchableOpacity
            style={[tw`p-2 bg-blue-500 rounded-lg items-center justify-center`, !textMessage.trim() && tw`bg-gray-400`]}
            onPress={handleSend}
            disabled={!textMessage.trim()}
          >
            <Icon.Send width={24} height={24} stroke="white" style={tw`mx-auto`} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
