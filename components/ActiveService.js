import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import Dashboard from "./DashCard";
import TableComponent from "./TableComponent";
import JobCard from "./JobCard"

const { width: screenWidth } = Dimensions.get("window");

const ActiveService = () => {
  const carouselRef = useRef(null);
  const [entries, setEntries] = useState([
    
    {
      type: "view",
      content: (
        <View style={tw`h-full `}>
          <JobCard />
        </View>
      ),
    },{
      type: "image",
      imageUrl:
        "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/2024/triple-banner/cooking-web.gif",
    },
    {
      type: "view",
      content: (
        <View style={tw`h-full`}>
          <Dashboard />
        </View>
      ),
    },
    {
      type: "image",
      imageUrl:
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/Week-33/upgrade_your_kitchen/Desktop_Homepage_Slider__712x384.jpg",
    },
    {
      type: "view",
      content: (
        <View style={tw`h-full `}>
          <TableComponent />
        </View>
      ),
    },
    {
      type: "image",
      imageUrl:
        "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/2024/triple-banner/cooling-web.gif",
    },
  ]);

  const autoScrollInterval = useRef(null);
  const userInteractionTimeout = useRef(null);

  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []);

  const startAutoScroll = () => {
    if (carouselRef.current) {
      autoScrollInterval.current = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.snapToNext();
        }
      }, 3000);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  const restartAutoScrollAfterInactivity = () => {
    if (userInteractionTimeout.current) {
      clearTimeout(userInteractionTimeout.current);
    }
    userInteractionTimeout.current = setTimeout(() => {
      startAutoScroll();
    }, 60000);
  };

  const handleUserInteraction = () => {
    stopAutoScroll();
    restartAutoScrollAfterInactivity();
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <View
            style={tw`bg-white items-center justify-center h-50 m-2 rounded-lg p-4 `}
          >
            <Text style={tw`text-black font-bold text-lg mb-2`}>
              {item.title}
            </Text>
            <Text style={tw`text-black`}>{item.description}</Text>
          </View>
        );

      case "image":
        return (
          <View
            style={tw`bg-white items-center justify-center h-50 m-2 rounded-lg`}
          >
            <Image
              style={tw`h-full w-full rounded-lg`}
              source={{ uri: item.imageUrl }}
              resizeMode="cover"
            />
          </View>
        );

      case "view":
        return <View style={tw`bg-white h-50 rounded-lg`}>{item.content}</View>;

      default:
        return null;
    }
  };

  return (
    <View style={tw`bg-white border-b-2 border-black`}>
      <View style={tw`h-55 m-2`}>
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.82}
          layout={"default"}
          onSnapToItem={(index) => handleUserInteraction()}
          onTouchStart={handleUserInteraction}
          onScrollBeginDrag={handleUserInteraction}
        />
      </View>
    </View>
  );
};

export default ActiveService;
