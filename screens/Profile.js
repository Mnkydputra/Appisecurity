import React, { Component , useState , useEffect } from 'react';
import { Text, View ,BackHandler , ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

import DataDiri from './DataDiri' 
import Status from './Status' 
import Poto from './Poto' 


const Tab = createMaterialTopTabNavigator();

export default function Pro() {

  return (
      <Tab.Navigator>
        <Tab.Screen name="Data Diri" component={DataDiri} />
        <Tab.Screen name="Biodata" component={Status} />
        <Tab.Screen name="Poto" component={Poto} />
      </Tab.Navigator>
  );
}
