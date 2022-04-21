import React, { Component , useState , useEffect } from 'react';
import { Text, Image, Avatar, Divider } from "react-native-elements";
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

import DataDiri from './DataDiri' 
import Status from './Status' 

const Tab = createMaterialTopTabNavigator();

export default function Pro() {

  return (
      // <Tab.Navigator>
      //   <Tab.Screen name="Data Diri" component={DataDiri} />
      //   <Tab.Screen name="Biodata" component={Status} />
      //   <Tab.Screen name="Poto" component={Poto} />
      // </Tab.Navigator>
      <ScrollView>
        <Image source={ require('../src/img/loading.png')}
          style={styles.cover}
        />
          <Avatar rounded size="large" source={ require('../src/img/PotoAGT-220927.png')} containerStyle={styles.avatar}/>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Murry Febriansyah</Text>
            <Text style={styles.username}>220927</Text>
            <Text style={styles.bio}>Anggota</Text>
            <Text style={styles.location}>VLC</Text>
          </View>
        
        <Tab.Navigator>
          <Tab.Screen name="Data Diri" component={DataDiri} />
          <Tab.Screen name="Biodata" component={Status} />
        </Tab.Navigator>
        
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {},
  cover: {
    width: "100%",
    height: 100,
  },
  avatar: {
    marginLeft: 20,
    marginTop: -40,
    borderWidth: 3,
    borderColor: "white",
    borderStyle: "solid",
  },
  profileInfo: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  bio: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 21,
  },
  username: {
    color: "#657786",
  },
  
});
