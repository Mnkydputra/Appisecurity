import React, { useState, useEffect } from "react";
// import { TouchableOpacity, StyleSheet, View, BackHandler  } from "react-native";
import { Alert, Image, Keyboard, KeyboardAvoidingView,   TouchableWithoutFeedback, Pressable, StyleSheet,  ActivityIndicator , BackHandler , TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";
import * as Device from 'expo-device';

export default function Register({ navigation }) {
  const [npk, setNPK] = useState("");
  const [deviceToken, setdeviceToken] = useState("");
  const [id_akun, setIdAkun] = useState("");
  const [loading, setLoading] = useState(false);

  const backAction = () => {
    Alert.alert("Perhatian!", "Keluar Aplikasi ?", [
      {
        text: "Tidak",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YA", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };


  useEffect(() => {
    setdeviceToken(Device.osInternalBuildId)
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return function cleanup() {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);

  

  //jika di tekan tombol login  maka jalankan fungsi ini
  const onRegisterPress = async () => {
    setLoading(true);
    if(npk === '' || npk === null){
        Alert.alert('Perhatian', 'ISI NPK')
        setLoading(false);
    }else {
      // alert(deviceToken)
        try {
            // var urlAksi = "http://192.168.94.33:8090/api/registerDevice";
            var urlAksi = "https://isecuritydaihatsu.com/api/registerDevice";
            fetch(urlAksi, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "keys-isecurity": "isecurity",
            },
            body: "npk=" + npk + "&token=" + deviceToken,
            })
            .then((response) => response.json())
            .then((json) => {
              // console.log(json)
                if(json.status == false){
                    Alert.alert('Perhatian', json.message)
                    setLoading(false);
                }else {
                    Alert.alert("Berhasil !", json.message , [
                      { text: "YA", onPress: () => navigation.navigate('Login') },
                    ]);
                }
            })
        }catch(error){
            alert(error.message)
        }
    }
  };
  //end login

  return (
    <Background>
      <Logo />
      <Header>REGISTER DEVICE</Header>
      <TextInput label="ID Device" value={deviceToken} onChangeText={(value) => setdeviceToken(value)} placeholder="Token Device" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  editable={false} />

      <TextInput label="NPK" onChangeText={(value) => setNPK(value)} placeholder="NPK" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
      
      <Button mode="contained" onPress={onRegisterPress}>
        {loading ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
         : 
          <Text style={{color:'#fff'}}>REGISTER</Text>   
        }
      </Button>
      <TouchableOpacity onPress={() => {
          navigation.navigate('Login');
        }}>
          <Text >
            Sudah punya akun ?  LOGIN
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
});
