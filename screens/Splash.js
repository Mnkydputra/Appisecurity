import React, { Component , useEffect , useState } from 'react';
import { View, Text , Image , ActivityIndicator , StyleSheet } from 'react-native';

import { StackActions } from '@react-navigation/native';
export default function Splash({navigation,route})  {
  useEffect(() => {

    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Home'))
    },3000)
  },[])


    return (
      <View style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',}}>

       <Image style={{height:250, width:250}} source={{uri : "https://cdn-icons-png.flaticon.com/512/1801/1801293.png"}}></Image>
      </View>
    );
  }
