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


export default function FormEditDomisili({navigation,route}) {
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
                  setBiodata({ jl_dom: hasil.jl_dom,rt_dom: hasil.rt_dom,rw_dom: hasil.rw_dom,kel_dom: hasil.kel_dom,kec_dom: hasil.kec_dom,kota_dom: hasil.kota_dom,provinsi_dom: hasil.provinsi_dom})
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
        value={biodata.jl_dom}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Nama Jalan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <View style={styles.marginTextInput}>
      <TextInput label="RT" 
        value={biodata.rt_dom}
        onChangeText={ newText => setBiodata({ rt_dom: newText }) }
        placeholder="RT" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="RW" 
        value={biodata.rw_dom}
        onChangeText={newText => setBiodata({ rw_dom : newText })}
        placeholder="RW" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="PROVINSI" 
        value={biodata.provinsi_dom}
        onChangeText={ newText => setBiodata({ provinsi_dom : newText }) }
        placeholder="PROVINSI" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kabupaten / Kota " 
        value={biodata.kota_dom}
        onChangeText={ newText => setBiodata({ kota_dom : newText }) }
        placeholder="Kabupaten / Kota " placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kecamatan" 
        value={biodata.kec_dom}
        onChangeText={newText => setBiodata({ kec_dom : newText })}
        placeholder="Kecamatan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Kelurahan" 
        value={biodata.kel_dom}
        onChangeText={ newText => setBiodata({ kel_dom : newText }) }
        placeholder="Kelurahan" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <Button mode="contained" onPress={() => null } style={{marginTop:20}}>
          UPDATE DATA DOMISILI
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
