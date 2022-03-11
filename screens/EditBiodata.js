import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import  FormBiodata from '../screens/FormEditBiodata'
import  FormKTP from '../screens/FormEditKTP'
import FormEditDomisili from '../screens/FormEditDomisili'
import FormEditIMT from '../screens/FormEditIMT'


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();


export default function EditBiodata ({navigation,route}) {

    return (
      <Tab.Navigator>
        <Tab.Screen name="Biodata" component={FormBiodata} />
        <Tab.Screen name="KTP" component={FormKTP} />
        <Tab.Screen name="Domisili" component={FormEditDomisili} />
        <Tab.Screen name="Postur Tubuh" component={FormEditIMT} />
      </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    container : {
        flex :2 , 
        margin: 14 ,
    } ,
    marginTextInput : {
        marginBottom:-17
    }
})
