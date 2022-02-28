import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
export default function Profile({navigation , route }) {
    const [biodata , setBiodata] = useState({npk: '', nama: '',ktp: '',kk: '',tempat_lahir: '',tanggal_lahir: '',email: '',no_hp: '',no_emergency: '',tinggi_badan: '',berat_badan: '',imt: '',keterangan: '',jl_ktp: '',rt_ktp: '',rw_ktp: '',kel_ktp: '',kec_ktp: '',kota_ktp: '',provinsi_ktp: '',jl_dom: '',rt_dom: '',rw_dom: '',kel_dom: '',kec_dom: '',kota_dom: '',provinsi_dom: '' })


    //tombol kembali 
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

    useEffect(() => {

        const getBiodata = async () => {
            const  id_akun = await  AsyncStorage.getItem('id_akun');
            console.log(id_akun)
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
          }
          getBiodata();
    
          const handleBackPress = () => {
            navigation.navigate('Home');
            return true;
          };
        
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);
    return (
      <Background>
        <View style={styles.container}>
          <BackButton goBack={navigation.goBack} />
          <View style={styles.btn}>
            <View style={{ marginRight: 4 }}>
              <Button mode="contained" onPress={() => navigation.navigate("Profile")}>
                Biodata
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate("Status")}>
                Biodata
              </Button>
            </View>
          </View>
          <View>
            <Text> Profile anggota </Text>
            <Text> Nama : {biodata.nama} </Text>
            <Text> Npk : {biodata.npk} </Text>
            <Text> KTP : {biodata.ktp} </Text>
            <Text> KK : {biodata.kk} </Text>
            <Text> tempat lahir : {biodata.tempat_lahir} </Text>
            <Text> Tanggal Lahir : {biodata.tanggal_lahir} </Text>
            <Text> email : {biodata.email} </Text>
            <Text> no hp : {biodata.no_hp} </Text>
            <Text> no emergency : {biodata.no_emergency} </Text>
            <Text> tinggi badan : {biodata.tinggi_badan} </Text>
            <Text> berat badan: {biodata.berat_badan} </Text>
            <Text> imt : {biodata.imt} </Text>
            <Text> keterangan : {biodata.keterangan} </Text>
            <Text> Alamat KTP: {biodata.jl_ktp} </Text>
            <Text> RT KTP: {biodata.rt_ktp} </Text>
            <Text> RW KTP: {biodata.rw_ktp} </Text>
            <Text> Kecamatan KTP: {biodata.kec_ktp} </Text>
            <Text> Kelurahan KTP: {biodata.kel_ktp} </Text>
            <Text> Kota KTP: {biodata.kota_ktp} </Text>
            <Text> Provinsi KTP: {biodata.provinsi_ktp} </Text>
            <Text> Jalan Domisili: {biodata.jl_dom} </Text>
            <Text> rt Domisili: {biodata.rt_dom} </Text>
            <Text> RW Domisili: {biodata.rw_dom} </Text>
            <Text> kelurahan Domisili: {biodata.kel_dom} </Text>
            <Text> kecamatan Domisili: {biodata.kec_dom} </Text>
            <Text> kota Domisili: {biodata.kota_dom} </Text>
            <Text> provinsi Domisili: {biodata.provinsi_dom} </Text>
          </View>
        </View>
      </Background>
    );

  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
    btn : {
        alignItems: "center",
        justifyContent: "center" ,
        flexDirection: 'row',
        marginLeft : 2 ,
        flexWrap: 'wrap' ,
        backgroundColor : '#fff'
    }  
  })

