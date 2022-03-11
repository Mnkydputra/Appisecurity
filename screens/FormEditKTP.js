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


export default function FormEditKTP({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [biodata , setBiodata] = useState({npk: '', nama: '',ktp: '',kk: '',tempat_lahir: '',tanggal_lahir: '',email: '',no_hp: '',no_emergency: '',tinggi_badan: '',berat_badan: '',imt: '',keterangan: '',jl_ktp: '',rt_ktp: '',rw_ktp: '',kel_ktp: '',kec_ktp: '',kota_ktp: '',provinsi_ktp: '',jl_dom: '',rt_dom: '',rw_dom: '',kel_dom: '',kec_dom: '',kota_dom: '',provinsi_dom: ''  , kta : ''});
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
                  //   console.log(hasil.id_biodata)
                  setBiodata({npk: hasil.npk, nama: hasil.nama,ktp: hasil.ktp,kk: hasil.kk,tempat_lahir: hasil.tempat_lahir ,tanggal_lahir: hasil.tanggal_lahir,
                    email: hasil.email , no_hp: hasil.no_hp ,no_emergency: hasil.no_emergency , jl_ktp: hasil.jl_ktp,rt_ktp: hasil.rt_ktp,rw_ktp: hasil.rw_ktp,kel_ktp: hasil.kel_ktp,kec_ktp: hasil.kec_ktp,kota_ktp: hasil.kota_ktp,provinsi_ktp: hasil.provinsi_ktp})
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


    return (
      <View>
        <View style={styles.marginTextInput}>
      <TextInput label="Nama Jalan" 
        value={biodata.jl_ktp}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Nama Jalan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <View style={styles.marginTextInput}>
      <TextInput label="RT" 
        value={biodata.rt_ktp}
        onChangeText={ newText => setBiodata({ rt_ktp: newText }) }
        placeholder="RT" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="RW" 
        value={biodata.rw_ktp}
        onChangeText={newText => setBiodata({ rw_ktp : newText })}
        placeholder="RW" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="PROVINSI" 
        value={biodata.provinsi_ktp}
        onChangeText={ newText => setBiodata({ provinsi_ktp : newText }) }
        placeholder="PROVINSI" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kabupaten / Kota " 
        value={biodata.kota_ktp}
        onChangeText={ newText => setBiodata({ kota_ktp : newText }) }
        placeholder="Kabupaten / Kota " placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kecamatan" 
        value={biodata.kec_ktp}
        onChangeText={newText => setBiodata({ kec_ktp : newText })}
        placeholder="Kecamatan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kelurahan" 
        value={biodata.kel_ktp}
        onChangeText={ newText => setBiodata({ kel_ktp : newText }) }
        placeholder="Kelurahan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <Button mode="contained" onPress={() => null } style={{marginTop:20}}>
          UPDATE DATA KTP
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
