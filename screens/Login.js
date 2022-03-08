import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, BackHandler , Alert } from "react-native";
// import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, StyleSheet, Button, ActivityIndicator, BackHandler } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";


export default function Login({ navigation }) {
  const [npk, setNPK] = useState("");
  const [password, setPassword] = useState("");
  const [id_akun, setIdAkun] = useState("");
  const [loading, setLoading] = useState(false);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    let unmounted = false
    //jika token login ada isinya maka program redirect ke Home
    const tokenLogin = async () => {
      const value = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id_akun");
      if(!unmounted){
        if (value !== null) {
          navigation.navigate("Home", {
            id_user: id,
          });
        }else if(value === null){
          // console.log(value);
        }
      }
    };
    tokenLogin();
    //end
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return function cleanup() {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      unmounted = false ;
    }


  }, []);

  //jika di tekan tombol login  maka jalankan fungsi ini
  const onLoginPress = async () => {
    setLoading(true);
    if (npk === "" || password === "") {
      alert("isi npk dan password");
      setLoading(false);
    } else {
      var urlAksi = "https://isecuritydaihatsu.com/api/cekAkun";
      fetch(urlAksi, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "keys-isecurity": "isecurity",
        },
        body: "npk=" + npk + "&password=" + password,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          if(json === null){
            console.log('data not found');
          }else {
            if (json.message === "Tidak ada data") {
              alert("akun tidak ada");
              setLoading(false);
            } else {
              const hasil = json.result[0];
              console.log(hasil)
              if (npk === hasil.npk) {
                setNPK(hasil.npk);
                setIdAkun(hasil.id_akun);
                const id_user = hasil.id_akun;
                const patrol = hasil.status_patrol;
                const patrol_w = hasil.password;
                AsyncStorage.setItem("token", id_user);
                AsyncStorage.setItem("id_akun", id_user);
                AsyncStorage.setItem("patrol", patrol);
                AsyncStorage.setItem("token_patrol",patrol_w);
                navigation.navigate("Home", {
                  id_user: id_user,
                });
                setLoading(false);
              } else {
                alert("akun tidak terdaftar ");
                setLoading(false);
              }
            }
          }
        });
    }
  };
  //end login

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Welcome  </Header>
      <TextInput label="NPK" onChangeText={(value) => setNPK(value)} placeholder="NPK" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
      <TextInput label="Password" onChangeText={(value) => setPassword(value)} placeholder="PASSWORD" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
      <Button mode="contained" onPress={onLoginPress}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
