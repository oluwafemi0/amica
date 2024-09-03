import React from "react";
import { View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const Map = () => {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={[tw`m-2 p-2 rounded-lg`, { width: width - 20, height: height / 3 }]}>
      <MapView
        style={{ flex: 1, borderRadius: 10 }}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"Test Marker"}
          description={"This is a description for the test marker."}
        />
      </MapView>
    </View>
  );
};

export default Map;
