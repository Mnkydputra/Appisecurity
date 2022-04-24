import React, { Component, useState, useEffect } from "react";
import { Text, Image, Avatar, Divider } from "react-native-elements";
import { View, StyleSheet, BackHandler, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Navigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DataDiri from "./DataDiri";
import Status from "./Status";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function Pro({ Navigation, route }) {
  useEffect(() => {
    console.log(route.params.npk);
  }, []);
  return (
    <ScrollView>
      <View style={styles.cover} />
      <Avatar rounded size="large" source={require("../src/img/PotoAGT-220927.png")} containerStyle={styles.avatar} />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>Murry Febriansyah</Text>
        <Text style={styles.username}>220927</Text>
        <Text style={styles.bio}>Anggota</Text>
        <Text style={styles.location}>VLC</Text>
      </View>
      <SafeAreaView>
        <Tab.Navigator>
          <Tab.Screen
            name="Data Diri"
            component={DataDiri}
            initialParams={{
              nama: route.params.nama,
              npk: route.params.npk,
              id_akun: route.params.id_akun,
              wilayah: route.params.wilayah,
              area_kerja: route.params.area_kerja,
              jabatan: route.params.jabatan,
            }}
          />
          <Tab.Screen
            name="Biodata"
            component={Status}
            initialParams={{
              nama: route.params.nama,
              npk: route.params.npk,
              id_akun: route.params.id_akun,
              wilayah: route.params.wilayah,
              area_kerja: route.params.area_kerja,
              jabatan: route.params.jabatan,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: "100%",
    height: 100,
    backgroundColor: "#50C4DE",
  },
  avatar: {
    justifyContent: "center",
    marginTop: -40,
    borderWidth: 3,
    borderColor: "#000",
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
