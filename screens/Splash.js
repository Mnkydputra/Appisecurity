import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";

import { StackActions } from "@react-navigation/native";
export default function Splash({ navigation, route }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace("Home"));
    }, 5000);
  }, []);

  return (
      <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
       <Image style={{height:150, width:150}} source={require("../src/img/splassh.png")}></Image>
      </View>
    );
  }
