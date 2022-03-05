import React, { useState, useEffect } from "react";


import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View, StyleSheet, Button, ActivityIndicator, BackHandler } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
    //jika token login ada isinya maka program redirect ke Home
    const tokenLogin = async () => {
      const value = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id_akun");
      if (value !== null) {
        navigation.navigate("Home", {
          id_user: id,
        });
      }
    };

    tokenLogin();
    //end

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
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
          // console.log(json.message)
          if (json.message === "Tidak ada data") {
            alert("akun tidak ada");
            setLoading(false);
          } else {
            const hasil = json.result[0];
            // console.log(hasil)
            if (npk === hasil.npk) {
              setNPK(hasil.npk);
              setIdAkun(hasil.id_akun);
              const id_user = hasil.id_akun;
              AsyncStorage.setItem("token", id_user);
              AsyncStorage.setItem("id_akun", id_user);
              navigation.navigate("Home", {
                id_user: id_user,
              });
              setLoading(false);
            } else {
              alert("akun tidak terdaftar ");
              setLoading(false);
            }
          }
        });
    }
  };

  //end login

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>ISECURITY</Text>
            <TextInput onChangeText={(value) => setNPK(value)} placeholder="NPK" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput onChangeText={(value) => setPassword(value)} placeholder="PASSWORD" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={onLoginPress} title="Login" />
            <ActivityIndicator animating={loading} color="red" size="large"></ActivityIndicator>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent",
  },
});