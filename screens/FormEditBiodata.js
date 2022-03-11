import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";


export default function FormEditBiodata({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [biodata , setBiodata] = useState({npk: '', nama: '',ktp: '',kk: '',tempat_lahir: '',tanggal_lahir: '',email: '',no_hp: '',no_emergency: '',tinggi_badan: '',berat_badan: '',imt: '',keterangan: '',jl_ktp: '',rt_ktp: '',rw_ktp: '',kel_ktp: '',kec_ktp: '',kota_ktp: '',provinsi_ktp: '',jl_dom: '',rt_dom: '',rw_dom: '',kel_dom: '',kec_dom: '',kota_dom: '',provinsi_dom: ''  , kta : ''});
    useEffect(() => {
          try {
            const getBiodata = async () => {
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
                  //   console.log(hasil.id_biodata)
                    setBiodata({npk: hasil.npk, nama: hasil.nama,ktp: hasil.ktp,
                    kk: hasil.kk,tempat_lahir: hasil.tempat_lahir ,tanggal_lahir: hasil.tanggal_lahir,
                    email: hasil.email , no_hp: hasil.no_hp ,no_emergency: hasil.no_emergency , jl_ktp: hasil.jl_ktp,rt_ktp: hasil.rt_ktp,rw_ktp: hasil.rw_ktp,kel_ktp: hasil.kel_ktp,kec_ktp: hasil.kec_ktp,kota_ktp: hasil.kota_ktp,provinsi_ktp: hasil.provinsi_ktp}) 
                  })
            }
            getBiodata();
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

    const updateBiodata = async () => {
        try {
            const data = {
                'kk'  : biodata.kk
            }
        }catch(error){

        }
    }


    return (
      <View>
        <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata({tempat_lahir
        : newText })}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <View style={styles.marginTextInput}>
      <TextInput label="Tanggal Lahir" 
        value={biodata.tanggal_lahir}
        onChangeText={ newText => setBiodata({ tanggal_lahir: newText }) }
        placeholder="Tanggal Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO KTP" 
        value={biodata.ktp}
        onChangeText={newText => setBiodata({ ktp: newText })}
        placeholder="NO KTP" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO KK" 
        value={biodata.kk}
        onChangeText={ newText => setBiodata({ kk: newText }) }
        placeholder="NO KK" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO HANDPHONE" 
        value={biodata.no_hp}
        onChangeText={ newText => setBiodata({ no_hp : newText }) }
        placeholder="NO HANDPHONE" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO EMERGENCY" 
        value={biodata.no_emergency}
        onChangeText={newText => setBiodata({ no_emergency : newText })}
        placeholder="NO EMERGENCY" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Email" 
        value={biodata.email}
        onChangeText={ newText => setBiodata({ email : newText }) }
        placeholder="Email" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <Button mode="contained" onPress={updateBiodata} style={{marginTop:20}}>
          UPDATE BIODATA
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
