import React, { Component , useState , useEffect } from 'react';
import { Text, View ,BackHandler , ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

import Profile from '../screens/Profile' 
import Status from '../screens/Status' 
import Poto from '../screens/Poto' 


const Tab = createMaterialTopTabNavigator();

export default function Pro() {

  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Biodata" component={Status} />
        <Tab.Screen name="Poto" component={Poto} />
      </Tab.Navigator>
  );
}
