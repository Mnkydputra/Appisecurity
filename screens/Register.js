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
    let unmounted = false
    registerForPushNotificationsAsync();
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

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      setdeviceToken(token)
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}

  //jika di tekan tombol login  maka jalankan fungsi ini
  const onRegisterPress = async () => {
    setLoading(true);
        if(npk === '' || npk === null){
                Alert.alert('Perhatian')
        }
  };
  //end login

  return (
    <Background>
      <Logo />
      <Header>REGISTER YOUR DEVICE</Header>
      <TextInput label="NPK" onChangeText={(value) => setNPK(value)} placeholder="NPK" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
      <TextInput label="Token Device" value={deviceToken} onChangeText={(value) => setdeviceToken(value)} placeholder="Token Device" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} editable={false} />
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
