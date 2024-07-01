import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import tw from "twrnc";

const ChatScreen = () => {
  const { user } = useRoute().params;
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

      updateChatList(user);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateChatList = async (user) => {
    const chatId = [currentUser.uid, user.id].sort().join("");
    const chatRef = firestore().collection("chats").doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      await chatRef.set({
        members: {
          [currentUser.uid]: true,
          [user.id]: true,
        },
        otherUser: user.data,
      });
    }

    const otherUserId = Object.keys(chatDoc.data().members).find(
      (memberId) => memberId !== currentUser.uid
    );
    const otherUserDoc = await firestore()
      .collection("users")
      .doc(otherUserId)
      .get();

    const newChat = {
      id: chatId,
      userId: otherUserId,
      user: otherUserDoc.data(),
    };

    navigation.setParams({ user: newChat });
  };

  const renderItem = ({ item }) => {
    const isSent = item.data.from === currentUser.uid;

    return (
      <View
        style={[
          tw`bg-gray-200 px-4 py-2 mb-2 rounded-xl max-w-[60%]`,
          isSent ? tw`self-end bg-[#CBC3E3]` : tw`self-start`,
        ]}
      >
        <Text style={isSent ? tw`text-black` : tw`text-black`}>
          {item.data.text}
        </Text>
        <Text
          style={[
            tw`text-xs text-[#899499] mt-1`,
            isSent ? tw`text-right` : tw`text-left`,
          ]}
        >
          {formatDate(item.data.createdAt)}
        </Text>
      </View>
    );
  };

  const formatDate = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date.toDate()).toLocaleDateString(undefined, options);
  };

  return (
    <View style={tw`flex-1 bg-gray-50 `}>
      <View style={tw`p-4 bg-[#fff] mb-4 `}>
        <View style={tw`flex-row justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={[tw`bg-[#CBC3E3]  p-1 rounded-full`, {  borderColor: "#000", borderWidth: 2 }]}
            onPress={() => navigation.goBack()}
          >
            <Icon.ArrowLeft strokeWidth={2} stroke={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 items-center`} >
            <View style={tw` items-center mx-auto`}>
              {user.data ? (
                <View style={tw`flex flex-row w-74 ml-4 mt-1 justify-between`}>
                  <View>
                    <Text style={tw`text-xl text-[#000] font-bold`}>
                      {user.data.categories}
                    </Text>
                    <Text style={tw`text-[#899499]`}>{user.data.category}</Text>
                    <Text style={tw`text-[#899499] text-sm`}>{user.data.location}</Text>
                  </View>
                  <View>
                    <Image
                      style={tw`w-15 h-15 rounded-full border-2 border-[#000]`}
                      source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${user.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
                      }}
                    />
                  </View>
                </View>
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`rounded-md p-2`}>
           
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={tw`flex-1 p-2`}
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
            style={[
              tw`p-2 bg-blue-500 rounded-lg items-center justify-center`,
              !textMessage.trim() && tw`bg-gray-400`,
            ]}
            onPress={handleSend}
            disabled={!textMessage.trim()}
          >
            <Icon.Send width={24} height={24} stroke="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
