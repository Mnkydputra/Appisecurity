import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler, FlatList, ActivityIndicator, Dimensions , ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";
import { ImageSlider } from "react-native-image-slider-banner";
import Slideshow from 'react-native-image-slider-show';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window");
const dataSource = [
  {
    title: 'Title 1',
    caption: 'Caption 1',
    url: 'http://placeimg.com/640/480/any',
  }, {
    title: 'Title 2',
    caption: 'Caption 2',
    url: 'http://placeimg.com/640/480/any',
  }, {
    title: 'Title 3',
    caption: 'Caption 3',
    url: 'http://placeimg.com/640/480/any',
  },
];

const images=  [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree",        // Local image
];
const windowHeight = Dimensions.get("window").height;
export default function Sample({ navigation, route }) {
const [interval, settingInterval] = useState(null);
const [position , setPosition ] = useState(1) ;


const setWaktu = () => {
   settingInterval(setInterval(() => {
      setPosition (position === dataSource.length ? 0 : position + 1)
  }, 2000));
  clearInterval(interval);
}



useEffect(() => {
  setWaktu();
})

  return (
    <View style={styles.container}>
      <SliderBox images={images} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  slider : {
    padding : 5 ,
    borderRadius:2
  }
});
