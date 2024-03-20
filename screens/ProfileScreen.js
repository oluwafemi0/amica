import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function ProfileScreen() {
    const { params } = useRoute();
    const navigation = useNavigation();

    // Get the current user from Firebase authentication
    const user = auth().currentUser;

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], 
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={tw`bg-white shadow`}>
            <ScrollView>
                <View>
                    <Image style={tw`w-35 h-35 mx-auto mt-15 rounded-full`} source={{ uri: user.photoURL }} />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-26 left-4 bg-white p-2 rounded-full`}>
                        <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
                    </TouchableOpacity>
                </View>

                <View style={tw`h-135 m-2 mt-5 rounded-lg bg-white`}>
                    <View style={tw`h-1/5 roundedlg bg-green-100 flex flex-row`}>
                        <View style={tw`w-4/6 rounded-l-lg opacity-85 bg-[#F06292]`}>
                            <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>{user.displayName}</Text>
                        </View>
                        <View style={tw`w-2/6 rounded-r-lg bg-green-400`}>
                            <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>balance</Text>
                        </View>
                    </View>
                    <View style={tw`h-4/5 rounded-b-lg bg-white mt-4`}>
                        <TouchableOpacity onPress={() =>navigation.navigate('Edit')} style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
                            <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
                            <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Address Book</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
                            <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Work History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
                            <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw`p-2 px-8`}>
                    <TouchableOpacity style={tw`rounded-lg w-full h-12 bg-[#F06292] mx-auto mb-6`} onPress={signOut}>
                        <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
