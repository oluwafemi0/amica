import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { useState, useEffect } from "react"; //3
import tw from "twrnc";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"; //1

export default function RestaurantsCard() {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null); //2
  const user = auth().currentUser;

  //4
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsSnapshot = await firestore()
          .collection("users")
          .doc(user.uid)
          .collection("details")
          .doc("userDetails")
          .get();

        if (userDetailsSnapshot.exists) {
          setUserDetails(userDetailsSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    fetchUserDetails();
  }, []);
  //4

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View style={tw`mr-6 bg-white rounded-lg m-1 shadow-md shadow-gray-400`}>
        <Image
          style={tw`h-45 w-40 rounded-t-lg`}
          source={require("../assets/images/HANDS.png")}
        />
        <View style={tw`px-3 pb-4 border-2 rounded-b-lg border-gray-400`}>
          <Text
            style={tw`text-lg text-gray-400 font-bold mb-2 text-center`}
          ></Text>
          <View
            style={tw`flex-row flex justify-between  rounded-lg bg-gray-400 p-2 `}
          >
            <View style={tw`text-xs  flex-row `}>
              <Image
                source={require("../assets/images/star.png")}
                style={tw`h-4 w-4`}
              />
              <Text style={tw`text-white `}> </Text>
            </View>

            <View>
              <Text style={tw`font-bold text-white`}></Text>
            </View>
          </View>

          <View style={tw`flex-row flex justify-between pt-2`}>
            <View style={tw`text-xs flex-row `}>
              <Icon.MapPin height="14" width="14" stroke="gray" />
              <Text style={tw`text-gray-400 text-xs pl-0 `}>
                {" "}
                {userDetails?.location}
              </Text>
            </View>

            <View>
              <Text style={tw`text-gray-400 text-xs pl-2`}> </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
