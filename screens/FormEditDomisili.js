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


export default function FormEditDomisili({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [jl_dom , setJLdom ] = useState('');
    const [rt_dom , setRT]     = useState('');
    const [rw_dom , setRW]     = useState('');
    const [kel_dom ,setKel]    = useState('');
    const [kec_dom , setKec]   = useState('');
    const [kota_dom , setKota] = useState('');
    const [provinsi_dom , setProvinsi] = useState('');
    const [wait , setWaiting ] = useState(false)
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
                        setJLdom(hasil.jl_dom);
                        setRT(hasil.rt_dom)
                        setRW(hasil.rw_dom);
                        setKel(hasil.kel_dom);
                        setKec(hasil.kec_dom);
                        setKota(hasil.kota_dom)
                        setProvinsi(hasil.provinsi_dom)
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


    //function update data alamat sesua ktp 
    const updateDomisili = async () => {
      if(jl_dom === '' || jl_dom === null){
        Alert.alert("Perhatian!", "Field Jalan  Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(rt_dom === '' || rt_dom === null){
        Alert.alert("Perhatian!", "Field RT Lahir Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(rw_dom === "" || rw_dom === null){
        Alert.alert("Perhatian!", "Field RW Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(provinsi_dom === '' || provinsi_dom === null){
        Alert.alert("Perhatian!", "Field Kartu Keluarga Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kota_dom === '' || kota_dom === null){
        Alert.alert("Perhatian!", "Field No Handphone Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kota_dom === '' || kota_dom === null ){
        Alert.alert("Perhatian!", "Field No Emergency Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kec_dom === '' || kec_dom === null){
        Alert.alert("Perhatian!", "Field Email Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kel_dom === '' || kel_dom === null){
        Alert.alert("Perhatian!", "Field Email Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else {
        try {
          setWaiting(true);
          const id_akun = await AsyncStorage.getItem('id_akun');
          var url = 'https://isecuritydaihatsu.com/api/updateDomisili';
              fetch(url,{
                  headers : {
                      'keys-isecurity' : 'isecurity' ,
                      'Content-Type': 'application/json' , 
                  } ,
                  method : 'PUT' , 
                  body : JSON.stringify({
                    "id"             : id_akun ,
                    "jl_dom"         : jl_dom, 
                    "rt_dom"         : rt_dom ,
                    "rw_dom"         : rw_dom ,
                    "kel_dom"        : kel_dom,
                    "kec_dom"        : kec_dom ,
                    "kota_dom"       : kota_dom ,
                    "provinsi_dom"   : provinsi_dom
                  })
              })
              .then((response) => response.json())
              .then((json) => {
                console.log(json.status);
                // setWaiting(false);
                if(json.status === "ok"){
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

      <ScrollView  style={styles.container}>
          <View  style={styles.container2}>
        <View style={styles.marginTextInput}>
          <TextInput label="Nama Jalan" 
            value={jl_dom}
            style={styles.textBg}
            onChangeText={text => setJLdom(text)}
            placeholder="Nama Jalan" placeholderColor="#c4c3cb">
            </TextInput>
          </View>

          <View style={styles.marginTextInput}>
          <TextInput label="RT" 
            value={rt_dom}
            style={styles.textBg}
            onChangeText={ text => setRT(text) }
            placeholder="RT" placeholderColor="#c4c3cb">
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="RW" 
            value={rw_dom}
            style={styles.textBg}
            onChangeText={text => setRW(text)}
            placeholder="RW" placeholderColor="#c4c3cb">
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="PROVINSI" 
            value={provinsi_dom}
            style={styles.textBg}
            onChangeText={ text => setProvinsi(text) }
            placeholder="PROVINSI" placeholderColor="#c4c3cb">
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="Kabupaten / Kota " 
            value={kota_dom}
            style={styles.textBg}
            onChangeText={ text => setKota(text) }
            placeholder="Kabupaten / Kota " placeholderColor="#c4c3cb">
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="Kecamatan" 
            value={kec_dom}
            style={styles.textBg}
            onChangeText={text => setKec(text)}
            placeholder="Kecamatan" placeholderColor="#c4c3cb">
            </TextInput>
          </View>
          <View style={styles.marginTextInput}>
          <TextInput label="Kelurahan" 
            value={kel_dom}
            style={styles.textBg}
            onChangeText={ text => setKel(text) }
            placeholder="Kelurahan" placeholderColor="#c4c3cb">
            </TextInput>
          </View>

          <Button mode="contained" onPress={updateDomisili } style={{marginTop:20}}>
          {wait ? 
                <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
                : 
                  <Text style={{color:'#fff'}}>UPDATE DOMISILI </Text>   
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
    marginTextInput : {
        // marginBottom:-17
    },
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
