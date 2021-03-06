// FormEditIMT.js

import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , Alert} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
// import TextInput from "../src/component/TextInput";
import { TextInput , Headline, Card} from "react-native-paper";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";


export default function FormEditIMT({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [wait , setWaiting ] = useState(false)
    const [berat_badan , setBB] = useState('');
    const [tinggi_badan , setTB] = useState('');
    const [imt , setIMT]  = useState('');
    const [keterangan , setKet] = useState('');
    useEffect(() => {
      try {
        const getKTP = async () => {
          const  id_akun = await  AsyncStorage.getItem('id_akun');
            var urlAksi = 'https://isecuritydaihatsu.com/api/biodata?id=' + id_akun ;
          fetch(urlAksi,{
              headers : {
                  'keys-isecurity' : 'isecurity' ,
              } ,
          })
          .then((response) => response.json())
          .then((json) => {
            const hasil =  json.result[0] ;
            setBB(hasil.berat_badan);
            setTB(hasil.tinggi_badan);
            setKet(hasil.keterangan);
            setIMT(hasil.imt)
          })
        }
        getKTP();
      }catch(error){
        alert(error.message)
      }

      const handleBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);


    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    //

    const updateIMT = async () => {
      const id_akun = await AsyncStorage.getItem('id_akun')
      if(berat_badan === '' || berat_badan === null){
        Alert.alert("Perhatian!", "Field Berat Badan  Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(tinggi_badan === '' || tinggi_badan === null){
        Alert.alert("Perhatian!", "Field Tinggi Badan Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else {
        try {
          setWaiting(true);
          const id_akun = await AsyncStorage.getItem('id_akun');
          var url = 'https://isecuritydaihatsu.com/api/updateIMT';
              fetch(url,{
                  headers : {
                      'keys-isecurity' : 'isecurity' ,
                      'Content-Type': 'application/json' , 
                  } ,
                  method : 'PUT' , 
                  body : JSON.stringify({
                    "id"             : id_akun ,
                    "berat_badan"    : berat_badan, 
                    "tinggi_badan"   : tinggi_badan ,
                    "imt"            : imt ,
                    "keterangan"     : keterangan,
                  })
              })
              .then((response) => response.json())
              .then((json) => {
                console.log(json.status);
                if(json.status === "ok"){
                  setWaiting(false);
                  // alert(JSON.stringify(json.result));
                  Alert.alert("Berhasil!", "UPDATE SUKSES", [
                    { text: "YA", onPress: () => setWaiting(false) },
                  ]);
                }else {
                  Alert.alert("Gagal!", "TERJADI KESALAHAN", [
                    { text: "YA", onPress: () => setWaiting(false) },
                  ]);
                }
              })
        }catch(error){
            alert(error.message)
        }
      }
    }


    //hitung imt
    const hitungIMT = () => {
      

      const tinggi = tinggi_badan / 100 ;
      const h_tinggi = tinggi.toFixed(2) * tinggi.toFixed(2) ;
      const imt =  60 *  parseFloat(tinggi * 2);
      // setIMT( parseInt(imt))
      
      if (imt > 27) {
        setKet("Gemuk, Kelebihan berat badan tingkat berat");
        setIMT( parseInt(imt));
        // keterangan = "Gemuk, Kelebihan berat badan tingkat berat";
      } else if ((imt >= 25.1) & (imt <= 27)) {
        setIMT( parseInt(imt));
        setKet("Gemuk, Kelebihan berat badan tingkat ringan");
        // keterangan = "Gemuk, Kelebihan berat badan tingkat ringan";
      } else if ((imt >= 18.5) & (imt <= 25)) {
        setIMT( parseInt(imt));
        setKet("Normal");
        // keterangan = "Normal";
      } else if ((imt >= 17) & (imt <= 18.4)) {
        setIMT( parseInt(imt));
        setKet("Kurus, Kekurangan berat badan tingkat ringan");
        // keterangan = "Kurus, Kekurangan berat badan tingkat ringan";
      } else {
        setIMT( parseInt(imt));
        setKet("Kurus, Kekurangan berat badan tingkat berat");
          // keterangan = "Kurus, Kekurangan berat badan tingkat berat";
      }
    }


    //


    return (
      <ScrollView  style={styles.container}>
      <View  style={styles.container2}>
          <View style={styles.marginTextInput}>
          <TextInput label="Berat Badan" 
            value={berat_badan}
            maxLength={3}
            style={styles.textBg}
            keyboardType="phone-pad"
            onChangeText={text => setBB(text) }
            placeholder="Berat Badan" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>

          <View style={styles.marginTextInput}>
          <TextInput label="Tinggi Badan" 
            value={tinggi_badan}
            keyboardType="phone-pad"
            maxLength={3}
            style={styles.textBg}
            onChangeText={ text => setTB(text) }
            onChange = {hitungIMT}
            placeholder="Tinggi  Badan" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="IMT" 
            value={`${imt}`}
            editable={false}
            style={styles.textBg}
            placeholder="IMT" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>

          <View style={styles.marginTextInput}>
          <TextInput label="Keterangan" 
            editable={false}
            value={keterangan}
            style={styles.textBg}
            placeholder="IMT" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>

          <Button mode="contained" onPress={updateIMT } style={{marginTop:20}}>
          {
            wait ? 
                <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
                : 
                <Text style={{color:'#fff'}}>UPDATE IMT </Text>   
          }
          </Button>
      </View>
      </ScrollView>
    );
  }


  const styles = StyleSheet.create({
    container : {
        flex :1 ,  
        // backgroundColor:'#fff' ,
        backgroundColor:'#50C4DE' ,
    } ,
    container2 : {
      backgroundColor:'#fff',
      margin: 10,
      padding:10,
      borderRadius: 10, 
    },
    textBg : {
      backgroundColor:'#fff' ,
      fontSize : 12
    }
})
