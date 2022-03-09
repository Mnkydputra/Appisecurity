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
export default function EditProfile ({navigation,route}) {
    const [biodata , setBiodata] = useState({npk: '', nama: '',ktp: '',kk: '',tempat_lahir: '',tanggal_lahir: '',email: '',no_hp: '',no_emergency: '',tinggi_badan: '',berat_badan: '',imt: '',keterangan: '',jl_ktp: '',rt_ktp: '',rw_ktp: '',kel_ktp: '',kec_ktp: '',kota_ktp: '',provinsi_ktp: '',jl_dom: '',rt_dom: '',rw_dom: '',kel_dom: '',kec_dom: '',kota_dom: '',provinsi_dom: ''  , kta : ''});
    useEffect(() => {
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
                  email: hasil.email , no_hp: hasil.no_hp ,no_emergency: hasil.no_emergency,
                  tinggi_badan: hasil.tinggi_badan ,berat_badan: hasil.berat_badan,imt: hasil.imt ,keterangan: hasil.keterangan, jl_ktp: hasil.jl_ktp ,rt_ktp: hasil.rt_ktp ,rw_ktp: hasil.rw_ktp,kel_ktp: hasil.kel_ktp,kec_ktp: hasil.kec_ktp,kota_ktp: hasil.kota_ktp,provinsi_ktp: hasil.provinsi_ktp, jl_dom: hasil.jl_dom,rt_dom: hasil.rt_dom ,rw_dom: hasil.rw_dom,kel_dom: hasil.kel_dom,kec_dom: hasil.kec_dom, kota_dom: hasil.kota_dom,provinsi_dom: hasil.provinsi_dom , kta : hasil.kta}) 
                })
          }
          getBiodata();
    
          const handleBackPress = () => {
            navigation.goBack();
            return true;
          };
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);


    const update = () => {

    }


    return (
        <ScrollView>

      <View style={styles.container}>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <View style={styles.marginTextInput}>
      <TextInput label="Tanggal Lahir" 
        value={biodata.tanggal_lahir}
        onChangeText={ newText => setBiodata({ tanggal_lahir: newText }) }
        placeholder="Nama" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO KTP" 
        value={biodata.ktp}
        onChangeText={newText => setBiodata(newText)}
        placeholder="NO KTP" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO KK" 
        value={biodata.kk}
        onChangeText={ newText => setBiodata({ nama : newText }) }
        placeholder="NO KK" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="NO KTA" 
        value={biodata.kta}
        onChangeText={ newText => setBiodata({ kta : newText }) }
        placeholder="NO KTA" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Nama Lengkap" 
        value={biodata.nama}
        onChangeText={ newText => setBiodata({ nama : newText }) }
        placeholder="Nama" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Nama Lengkap" 
        value={biodata.nama}
        onChangeText={ newText => setBiodata({ nama : newText }) }
        placeholder="Nama" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Nama Lengkap" 
        value={biodata.nama}
        onChangeText={ newText => setBiodata({ nama : newText }) }
        placeholder="Nama" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Nama Lengkap" 
        value={biodata.nama}
        onChangeText={ newText => setBiodata({ nama : newText }) }
        placeholder="Nama" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>
      <View style={styles.marginTextInput}>
      <TextInput label="Tempat Lahir" 
        value={biodata.tempat_lahir}
        onChangeText={newText => setBiodata(newText)}
        placeholder="Tempat Lahir" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
        </TextInput>
      </View>

      <Button mode="contained" onPress={update}>
        Login
      </Button>
      
      </View>
      </ScrollView>

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
