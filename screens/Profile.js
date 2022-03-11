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
import TextInput from '../src/component/TextInput';
export default function Profile({navigation , route }) {
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
          <DataTable.Row>
            <DataTable.Cell>Nama</DataTable.Cell>
            <DataTable.Cell>{biodata.nama}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Npk</DataTable.Cell>
            <DataTable.Cell>{biodata.npk}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Tempat Lahir</DataTable.Cell>
            <DataTable.Cell>{biodata.tempat_lahir}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Tanggal Lahir</DataTable.Cell>
            <DataTable.Cell>{biodata.tanggal_lahir}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Alamat KTP</DataTable.Cell>
            <DataTable.Cell>{biodata.no_emergency}</DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>Alamat Domisili</DataTable.Cell>
            <DataTable.Cell>{
              biodata.jl_ktp + ' '  +
              biodata.provinsi_ktp + ' '  +
              biodata.kota_ktp + ' '  +
              biodata.kec_ktp + ' '  +
              biodata.provinsi_ktp + ' '  +
              biodata.provinsi_ktp + ' ' 
            }</DataTable.Cell>
          </DataTable.Row>

          <TextInput>
              { 
                biodata.jl_ktp + ' ' + 
                biodata.jl_ktp + ' ' + 
                biodata.jl_ktp + ' ' + 
                biodata.jl_ktp + ' ' 
              }
          </TextInput>


          <DataTable.Row>
            <DataTable.Cell>No Hp</DataTable.Cell>
            <DataTable.Cell>{biodata.no_hp}</DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>No Emergency</DataTable.Cell>
            <DataTable.Cell>{biodata.no_emergency}</DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell>{biodata.email}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>No Hp</DataTable.Cell>
            <DataTable.Cell>{biodata.no_hp}</DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>Tinggi Badan</DataTable.Cell>
            <DataTable.Cell>{biodata.tinggi_badan + ' CM'}</DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>Berat Badan</DataTable.Cell>
            <DataTable.Cell>{biodata.berat_badan + ' KG'}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>IMT</DataTable.Cell>
            <DataTable.Cell>{biodata.imt}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Keterangan</DataTable.Cell>
            <DataTable.Cell>{biodata.keterangan}</DataTable.Cell>
          </DataTable.Row>

         
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
    }  
  })

