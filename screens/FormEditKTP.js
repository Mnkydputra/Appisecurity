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


export default function FormEditKTP({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [jl_ktp , setJLKTP ] = useState('');
    const [rt_ktp , setRT]     = useState('');
    const [rw_ktp , setRW]     = useState('');
    const [kel_ktp ,setKel]    = useState('');
    const [kec_ktp , setKec]   = useState('');
    const [kota_ktp , setKota] = useState('');
    const [provinsi_ktp , setProvinsi] = useState('');
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
                        setJLKTP(hasil.jl_ktp);
                        setRT(hasil.rt_ktp)
                        setRW(hasil.rw_ktp);
                        setKel(hasil.kel_ktp);
                        setKec(hasil.kec_ktp);
                        setKota(hasil.kota_ktp)
                        setProvinsi(hasil.provinsi_ktp)
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
    const updateAlamat = async () => {
      if(jl_ktp === '' || jl_ktp === null){
        Alert.alert("Perhatian!", "Field Jalan  Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(rt_ktp === '' || rt_ktp === null){
        Alert.alert("Perhatian!", "Field RT Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(rw_ktp === "" || rw_ktp === null){
        Alert.alert("Perhatian!", "Field RW  Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(provinsi_ktp === '' || provinsi_ktp === null){
        Alert.alert("Perhatian!", "Field Provinsi Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kota_ktp === '' || kota_ktp === null){
        Alert.alert("Perhatian!", "Field Kota Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kec_ktp === '' || kec_ktp === null){
        Alert.alert("Perhatian!", "Field Kecamatan Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kel_ktp === '' || kel_ktp === null){
        Alert.alert("Perhatian!", "Field Kelurahan Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else {
        try {
          setWaiting(true);
          const id_akun = await AsyncStorage.getItem('id_akun');
          var url = 'https://isecuritydaihatsu.com/api/updateKTP';
              fetch(url,{
                  headers : {
                      'keys-isecurity' : 'isecurity' ,
                      'Content-Type': 'application/json' , 
                  } ,
                  method : 'PUT' , 
                  body : JSON.stringify({
                    "id"             : id_akun ,
                    "jl_ktp"         : jl_ktp, 
                    "rt_ktp"         : rt_ktp ,
                    "rw_ktp"         : rw_ktp ,
                    "kel_ktp"        : kel_ktp,
                    "kec_ktp"        : kec_ktp ,
                    "kota_ktp"       : kota_ktp ,
                    "provinsi_ktp"   : provinsi_ktp
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
      <View style={{backgroundColor:'#fff'}}>
          <View style={styles.marginTextInput}>
            <TextInput label="Nama Jalan" 
              value={jl_ktp}
              onChangeText={text => setJLKTP(text)}
              placeholder="Nama Jalan" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>

            <View style={styles.marginTextInput}>
            <TextInput label="RT" 
              value={rt_ktp}
              onChangeText={ text => setRT(text) }
              placeholder="RT" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="RW" 
              value={rw_ktp}
              onChangeText={text => setRW(text)}
              placeholder="RW" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="PROVINSI" 
              value={provinsi_ktp}
              onChangeText={ text => setProvinsi(text) }
              placeholder="PROVINSI" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="Kabupaten / Kota " 
              value={kota_ktp}
              onChangeText={ text => setKota(text) }
              placeholder="Kabupaten / Kota " placeholderColor="#c4c3cb" >
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="Kecamatan" 
              value={kec_ktp}
              onChangeText={text => setKec(text)}
              placeholder="Kecamatan" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="Kelurahan" 
              value={kel_ktp}
              onChangeText={ text => setKel(text) }
              placeholder="Kelurahan" placeholderColor="#c4c3cb" >
              </TextInput>
            </View>

            <Button mode="contained" onPress={updateAlamat } style={{marginTop:20}}>
            {wait ? 
                  <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
                  : 
                    <Text style={{color:'#fff'}}>UPDATE ALAMAT KTP </Text>   
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
