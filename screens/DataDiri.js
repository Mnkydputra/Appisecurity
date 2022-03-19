import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,ActivityIndicator , ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
import { DataTable } from 'react-native-paper';
// import TextInput from '../src/component/TextInput';
import { TextInput } from "react-native-paper";
export default function DataDiri({navigation , route }) {
    const [biodata , setBiodata] = useState({npk: '', nama: '',ktp: '',kk: '',tempat_lahir: '',tanggal_lahir: '',email: '',no_hp: '',no_emergency: '',tinggi_badan: '',berat_badan: '',imt: '',keterangan: '',jl_ktp: '',rt_ktp: '',rw_ktp: '',kel_ktp: '',kec_ktp: '',kota_ktp: '',provinsi_ktp: '',jl_dom: '',rt_dom: '',rw_dom: '',kel_dom: '',kec_dom: '',kota_dom: '',provinsi_dom: '' })
    const [loading,setLoading] = useState(true)
  //tombol kembali 
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

    useEffect(() => {
        const getBiodata = async () => {
            const  id_akun = await  AsyncStorage.getItem('id_akun');
            try {
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
                  tinggi_badan: hasil.tinggi_badan ,berat_badan: hasil.berat_badan,imt: hasil.imt ,keterangan: hasil.keterangan, jl_ktp: hasil.jl_ktp ,rt_ktp: hasil.rt_ktp ,rw_ktp: hasil.rw_ktp,kel_ktp: hasil.kel_ktp,kec_ktp: hasil.kec_ktp,kota_ktp: hasil.kota_ktp,provinsi_ktp: hasil.provinsi_ktp, jl_dom: hasil.jl_dom,rt_dom: hasil.rt_dom ,rw_dom: hasil.rw_dom,kel_dom: hasil.kel_dom,kec_dom: hasil.kec_dom, kota_dom: hasil.kota_dom,provinsi_dom: hasil.provinsi_dom}) 
                })
            }catch(error){
                alert(error.message)
            }
              
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

    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    //
    return (
      <>

        {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
          <ScrollView>
          <TextInput
            style={styles.textINPUT}
            label="Nama"
            editable={false}
            placeholder="Nama"
            value={biodata.nama}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="NPK"
            editable={false}
            placeholder="NPK"
            value={biodata.npk}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Tempat Lahir"
            editable={false}
            placeholder="Tempat Lahir"
            value={biodata.tempat_lahir}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Tanggal Lahir"
            editable={false}
            placeholder="Tanggal Lahir"
            value={biodata.tanggal_lahir}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Alamat KTP"
            editable={false}
            multiline={true}
            numberOfLines={4}
            placeholder="Alamat KTP"
            value={ biodata.jl_ktp + "," + " Kelurahan " + biodata.kel_ktp  +  " RT " + biodata.rt_ktp + " RW " + biodata.rw_ktp + " Kecamatan "  + biodata.kec_ktp + " Kota "  + biodata.kota_ktp + " Provinsi "  + biodata.provinsi_ktp }
          ></TextInput>

         <TextInput
            label="Alamat Domisili"
            editable={false}
            style={styles.textINPUT}
            multiline={true}
            numberOfLines={4}
            placeholder="Alamat Domisili"
            value={ biodata.jl_dom + "," + " Kelurahan " + biodata.kel_dom  +  " RT " + biodata.rt_dom + " RW " + biodata.rw_dom + " Kecamatan "  + biodata.kec_dom + " Kota "  + biodata.kota_dom + " Provinsi "  + biodata.provinsi_dom }
          ></TextInput>

        <TextInput
            style={styles.textINPUT}
            label="No Handphone"
            editable={false}
            placeholder="No Handphone"
            value={biodata.no_hp}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="No Telepon Emergency"
            editable={false}
            placeholder="No Telepon Emergency"
            value={biodata.no_emergency}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Email"
            editable={false}
            placeholder="Email"
            value={biodata.email}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Tinggi Badan"
            editable={false}
            placeholder="Tinggi Badan"
            value={biodata.tinggi_badan + " cm"}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="Berat Badan"
            editable={false}
            placeholder="Berat Badan"
            value={biodata.berat_badan + " kg"}
          ></TextInput>

          <TextInput
            style={styles.textINPUT}
            label="IMT"
            editable={false}
            placeholder="IMT"
            value={biodata.imt}
          ></TextInput>

        <TextInput
            style={styles.textINPUT}
            label="Keterangan"
            editable={false}
            placeholder="Keterangan"
            value={biodata.keterangan}
          ></TextInput> 
        </ScrollView>
        }
      </>
          
    );

  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
      },
    btn : {
        alignItems: "center",
        justifyContent: "center" ,
        flexDirection: 'row',
        marginLeft : 2 ,
        flexWrap: 'wrap' ,
        backgroundColor : '#fff'
    } ,
    textINPUT : {
      backgroundColor :'#fff'
    } 
  })

