import React, { useState, useEffect } from "react";
// import { TouchableOpacity, StyleSheet, View, BackHandler  } from "react-native";
import { Alert, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Pressable, StyleSheet,  ActivityIndicator , BackHandler , TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";
// import { registerIndieID , registerNNPushToken } from 'native-notify';
import * as Device from 'expo-device';
export default function Login({ navigation }) {
  const [npk, setNPK] = useState("");
  const [password, setPassword] = useState("");
  const [id_akun, setIdAkun] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceToken, setdeviceToken] = useState("");

  const backAction = () => {
    Alert.alert("Perhatian!", "Keluar Aplikasi ?", [
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
    setdeviceToken(Device.osInternalBuildId)
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

    try {
      if (npk === "" ) {
        Alert.alert("Perhatian!", "NPK HARUS DI ISI", [
          { text: "YA", onPress: () => setLoading(false) },
        ]);
      } else if(password === ""){
        Alert.alert("Perhatian!", "PASSWORD HARUS DI ISI", [
          { text: "YA", onPress: () => setLoading(false) },
        ]);
      }else {
        // var urlAksi = "http://192.168.94.33:8090/api/cekAkun";
        var urlAksi = "https://isecuritydaihatsu.com/api/cekAkun";
        fetch(urlAksi, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "keys-isecurity": "isecurity",
          },
          body: "npk=" + npk + "&password=" + password + "&token="  + deviceToken,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
            if(json === null){
              console.log('data not found');
            }else {
              if (json.message === "Tidak ada data") {
                Alert.alert("Perhatian!", "AKUN TIDAK TERDAFTAR", [
                  { text: "YA", onPress: () => setLoading(false) },
                ]);
              }
               else if(json.status == false){
                Alert.alert("Perhatian!", json.message, [
                  { text: "YA", onPress: () => setLoading(false) },
                ]);
              }
              else {
                const hasil = json.result[0];
                // console.log(json)
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
                  // AsyncStorage.setItem("token_device",json.token);
                  navigation.navigate("Splash");
                  setLoading(false);
                } else {
                  Alert.alert("Perhatian!", "AKUN TIDAK TERDAFTAR", [
                    { text: "YA", onPress: () => setLoading(false) },
                  ]);
                }
              }
            }
          });
      }
    }catch(error){
      alert(error.message)
    }
    
  };
  //end login

  return (
    <Background>
      <Logo />
      <Header>Welcome</Header>
      <TextInput label="NPK" onChangeText={(value) => setNPK(value)} placeholder="NPK" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
      <TextInput label="Password" onChangeText={(value) => setPassword(value)} placeholder="PASSWORD" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
      <Button mode="contained" onPress={onLoginPress}>
        {loading ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
         : 
          <Text style={{color:'#fff'}}>Login </Text>   
        }
      </Button>

        <TouchableOpacity onPress={() => {
          navigation.navigate('Register');
        }}>
          <Text >
            Belum punya akun ?  REGISTER
          </Text>
        </TouchableOpacity>
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
  register : {
    fontSize:12 
  }
});
