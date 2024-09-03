import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import firestore from "@react-native-firebase/firestore"; 

const ViewPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [comment, setComment] = useState("");
  const [recentComments, setRecentComments] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentComments();
  }, []);

  const handleChatNavigation = () => {
    navigation.navigate("Chat", { user });
  };

  const handleCommentSubmit = async () => {
    try {
      setLoading(true);
      await firestore().collection("users").doc(user.id).update({
        comments: firestore.FieldValue.arrayUnion(comment)
      });
      console.log("Comment saved to Firestore:", comment);
      setComment("");
      fetchRecentComments(); 
    } catch (error) {
      console.error("Error saving comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentComments = async () => {
    try {
      const userDoc = await firestore().collection("users").doc(user.id).get();
      const userData = userDoc.data();
      if (userData && userData.comments && userData.comments.length > 0) {
        const lastIndex = userData.comments.length - 1;
        const secondLastIndex = lastIndex - 1;
        if (lastIndex === 0) {
          setRecentComments([userData.comments[0]]);
        } else {
          const lastComment = userData.comments[lastIndex];
          const secondLastComment = userData.comments[secondLastIndex];
          setRecentComments([secondLastComment, lastComment]);
        }
      }
    } catch (error) {
      console.error("Error fetching recent comments:", error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      
      <View style={tw`bg-white   shadow-md`}>
        <View style={tw`flex-row  justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`bg-transparent rounded-md z-40  p-2 `}
            onPress={() => navigation.goBack()}
          >
            <View style={tw`flex flex-row items-center  justify-center`}>
              <Icon.ArrowLeft strokeWidth={2} stroke={"#fff"} style={tw`mb-55 ml-2  p-3.5 rounded-md`} />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center mr-9`}>
          <Image
            style={tw`w-100 h-70  bg-gray-300`}
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${user.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
            }}
          />
          </View>
          <TouchableOpacity style={tw`bg-transparent rounded-md p-2`}  onPress={handleChatNavigation}>
            <View style={tw`flex flex-row items-center justify-center`}>
              
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
      
      showsVerticalScrollIndicator={false}>
        <View style={tw`items-center`}>
          <View style={tw`flex flex-row gap-62 mt-2 p-2`}>
            <View>
              <Text style={tw`text-3xl text-[#36013f] font-bold`}>{user.data.categories}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={tw`bg-white border-2 border-[#36013f] py-2 px-4  rounded`}
                onPress={handleChatNavigation}
              >
                <Text style={tw`text-[#36013f] font-bold`}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`p-2 bg-white m-2 h-15 rounded-md`}>
          <Text style={tw`text-[#36013f] text-base text-left uppercase  font-bold`}>category</Text>
          <View  style={tw`p-2 bg-white rounded-md  m-1`}>
              <Text style={tw`text-gray-500 font-semibold`}>{user.data.category}</Text>
          </View>
        </View>

        
        <View style={tw`p-2 bg-white m-2 h-78 rounded-md`}>
          <Text style={tw`text-[#36013f] text-base text-left uppercase  font-bold`}>Description</Text>
          <View  style={tw`p-2 bg-white rounded-md  m-1`}>
            <Text style={tw`text-gray-500 font-semibold`}>{user.data.description}</Text>
          </View>
        </View>

        <View style={tw`p-3 bg-gray-100 m-2 rounded-md`}>
          <View style={tw`p-0 flex flex-row`}>
            <TextInput
              placeholder="Add a comment"
              style={tw`h-10  w-4/5 text-left pl-2 bg-white text-gray-300  rounded-lg `}
              onChangeText={(text) => setComment(text)}
              value={comment}
            />
            <TouchableOpacity
              style={tw`bg-white border-2 border-[#36013f]  w-1/5 rounded-md ml-1`}
              onPress={handleCommentSubmit}
            >
              {loading ? (
                <ActivityIndicator color="#fff" style={tw` mx-auto pt-2 font-bold`}/>
              ) : (
                <Text style={tw`text-[#36013f] mx-auto pt-3 font-bold`}>{comment ? "Submit" : "Sent"}</Text>
              )}
            </TouchableOpacity>

          </View>
          {recentComments.map((recentComment, index) => (
            <View key={index} style={tw`mt-4 bg-white rounded-md p-2`}>
              <Text style={tw`text-gray-300 font-bold`}>User</Text>
              <Text style={tw`text-gray-500`}>{recentComment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewPage;
