import React, { Component, useState, useEffect } from "react";
import { Text, Image, Avatar, Divider } from "react-native-elements";
import { View, StyleSheet, ScrollView, ActivityIndicator, BackHandler } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

export default function Profile({ navigation, route }) {
  const [profiling, setProfiling] = useState({
    npk: "",
    gol_darah: "",
    tempat_lahir:"",
    tanggal_lahir:"",
    email: "",
    nama: "",
    kk: "",
    ktp: "",
    no_hp: "",
    no_emergency: "",
    tinggi_badan: "",
    berat_badan: "",
    imt: "",
    keterangan: "",
    jl_ktp: "",
    rt_ktp: "",
    rw_ktp: "",
    kel_ktp: "",
    kec_ktp: "",
    kota_ktp: "",
    provinsi_ktp: "",
    jl_dom: "",
    rt_dom: "",
    rw_dom: "",
    kel_dom: "",
    kec_dom: "",
    kota_dom: "",
    provinsi_dom: "",
    no_kta: "",
    expired_kta: "",
    jabatan: "",
    status_kta: "",
    area_kerja: "",
    wilayah: "",
    tgl_masuk_sigap: "",
    tgl_masuk_adm: "",
    foto: "",
  });
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    const getProfiling = async () => {
      const npk = route.params.npk;
      try {
        var urlAksi = "https://isecuritydaihatsu.com/api/profiling?npk=" + npk;
        fetch(urlAksi, {
          headers: {
            "keys-isecurity": "isecurity",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            const hasil = json.result[0];
            console.log(hasil);
            console.log(hasil.nama);
            // alert(hasil.npk);
            setNama(hasil.nama);
            setProfiling({
              npk: hasil.npk,
              gol_darah: hasil.gol_darah,
              tempat_lahir: hasil.tempat_lahir,
              tanggal_lahir: hasil.tanggal_lahir,
              email: hasil.email,
              nama: hasil.nama,
              kk: hasil.kk,
              ktp: hasil.ktp,
              no_hp: hasil.no_hp,
              no_emergency: hasil.no_emergency,
              tinggi_badan: hasil.tinggi_badan,
              berat_badan: hasil.berat_badan,
              imt: hasil.imt,
              keterangan: hasil.keterangan,
              jl_ktp: hasil.jl_ktp,
              rt_ktp: hasil.rt_ktp,
              rw_ktp: hasil.rw_ktp,
              kel_ktp: hasil.kel_ktp,
              kec_ktp: hasil.kec_ktp,
              kota_ktp: hasil.kota_ktp,
              provinsi_ktp: hasil.provinsi_ktp,
              jl_dom: hasil.jl_dom,
              rt_dom: hasil.rt_dom,
              rw_dom: hasil.rw_dom,
              kel_dom: hasil.kel_dom,
              kec_dom: hasil.kec_dom,
              kota_dom: hasil.kota_dom,
              provinsi_dom: hasil.provinsi_dom,
              no_kta: hasil.no_kta,
              expired_kta: hasil.expired_kta,
              jabatan: hasil.jabatan,
              status_kta: hasil.status_kta,
              area_kerja: hasil.area_kerja,
              wilayah: hasil.wilayah,
              tgl_masuk_sigap: hasil.tgl_masuk_sigap,
              tgl_masuk_adm: hasil.tgl_masuk_adm,
              foto: hasil.foto,
            });
          });
      } catch (error) {
        alert(error.message);
      }
    };

    getProfiling();

    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  //fungsi loading
  const showLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  showLoad();
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="red"></ActivityIndicator>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.card}>
            <Avatar rounded size="xlarge" source={require("../src/img/PotoAGT-220927.png")} containerStyle={styles.avatar} />

            <Text style={styles.username}>NPK</Text>
            <Text style={styles.name}>{profiling.npk}</Text>
            <Text style={styles.username}>NAMA LENGKAP</Text>
            <Text style={styles.name}>{profiling.nama}</Text>
            <Text style={styles.username}>JABATAN</Text>
            <Text style={styles.name}>{profiling.jabatan}</Text>
            <Text style={styles.username}>AREA KERJA</Text>
            <Text style={styles.name}>{profiling.area_kerja}</Text>
            <Text style={styles.username}>WILAYAH</Text>
            <Text style={styles.name}>{profiling.wilayah}</Text>
            <Text style={styles.username}>TEMPAT, TANGGAL LAHIR</Text>
            <Text style={styles.name}>
              {profiling.tempat_lahir},
              {profiling.tanggal_lahir}
            </Text>
            <Text style={styles.username}>NOMOR KTP</Text>
            <Text style={styles.name}>{profiling.ktp}</Text>
            <Text style={styles.username}>NOMOR KK</Text>
            <Text style={styles.name}>{profiling.kk}</Text>
            <Text style={styles.username}>NOMOR HP</Text>
            <Text style={styles.name}>{profiling.no_hp}</Text>
            <Text style={styles.username}>NOMOR DARURAT</Text>
            <Text style={styles.name}>{profiling.no_emergency}</Text>
            <Text style={styles.username}>ALAMAT KTP</Text>
            <Text style={styles.name}>
              {profiling.jl_ktp} RT:
              {profiling.rt_ktp}/ RW:
              {profiling.rw_ktp} KELURAHAN:
              {profiling.kel_ktp} KECATAMAN:
              {profiling.kec_ktp} PROVINSI:
              {profiling.provinsi_ktp}
            </Text>
            <Text style={styles.username}>ALAMAT DOMISILI</Text>
            <Text style={styles.name}>
              {profiling.jl_dom} RT:
              {profiling.rt_dom}/ RW:
              {profiling.rw_dom} KELURAHAN:
              {profiling.kel_dom} KECATAMAN:
              {profiling.kec_dom} PROVINSI:
              {profiling.provinsi_dom}
            </Text>
            <Text style={styles.username}>TINGGI BADAN</Text>
            <Text style={styles.name}>{profiling.tinggi_badan}</Text>
            <Text style={styles.username}>BERAT BADAN</Text>
            <Text style={styles.name}>{profiling.berat_badan}</Text>
            <Text style={styles.username}>GOLONGAN DARAH</Text>
            <Text style={styles.name}>{profiling.gol_darah}</Text>
            <Text style={styles.username}>STATUS INDEKS MASSA TUBUH</Text>
            <Text style={styles.name}>{profiling.keterangan}</Text>
            <Text style={styles.username}>ALAMAT EMAIL</Text>
            <Text style={styles.name}>{profiling.email}</Text>
            <Text style={styles.username}>STATUS KTA</Text>
            <Text style={styles.name}>{profiling.status_kta}</Text>
            <Text style={styles.username}>NOMOR REGISTRASI KTA</Text>
            <Text style={styles.name}>{profiling.no_kta}</Text>
            <Text style={styles.username}>TANGGAL BERAKHIR KTA</Text>
            <Text style={styles.name}>{profiling.expired_kta}</Text>
            <Text style={styles.username}>TANGGAL MASUK SIGAP</Text>
            <Text style={styles.name}>{profiling.tgl_masuk_sigap}</Text>
            <Text style={styles.username}>TANGGAL MASUK ADM</Text>
            <Text style={styles.name}>{profiling.tgl_masuk_adm}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#50C4DE",
  },
  card: {
    marginTop: 70,
    paddingTop: 110,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingBottom: 30,
  },
  cover: {
    margin: 10,
    paddingTop: 20,
    paddingLeft: 90,
  },
  avatar: {
    margin: -55,
    position: "absolute",
    marginLeft: 90,
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  profileInfo: {
    marginLeft: 10,
    marginTop: -40,
    marginBottom: 10,
  },
  bio: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 100,
  },
  name: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 21,
    paddingBottom: 1,
  },
  username: {
    paddingLeft: 5,
    color: "#657786",
  },
});
