// FormEditIMT.js

import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , Alert} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
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


    return (
      <View style={{backgroundColor:'#fff'}}>
          <View style={styles.marginTextInput}>
          <TextInput label="Berat Badan" 
            value={berat_badan}
            keyboardType="phone-pad"
            onChangeText={text => setBB(text) }
            placeholder="Berat Badan" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>

          <View style={styles.marginTextInput}>
          <TextInput label="Tinggi Badan" 
            value={tinggi_badan}
            keyboardType="phone-pad"
            onChangeText={ text => setTB(text) }
            placeholder="Tinggi  Badan" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="IMT" 
            value={imt}
            editable={false}
            onChangeText={text => setIMT(text)}
            placeholder="IMT" placeholderColor="#c4c3cb" >
            </TextInput>
          </View>

          <View style={styles.marginTextInput}>
          <TextInput label="Keterangan" 
            editable={false}
            value={keterangan}
            onChangeText={text =>  setKet(text) }
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
