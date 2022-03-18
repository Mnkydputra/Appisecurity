import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet ,ActivityIndicator , BackHandler, ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import { TextInput } from "react-native-paper";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
export default function Status({navigation , route }) {
    const [status , setStatus] = useState({
        id_employee: '',
        npk: '',
        no_kta: '',
        expired_kta: '',
        jabatan: '',
        status_anggota: '',
        status_kta: '',
        area_kerja: '',
        sub_area: '',
        wilayah: '',
        tgl_masuk_sigap: '',
        tgl_masuk_adm: '' })
    const [loading,setLoading] = useState(true)
    useEffect(() => {

        const getBiodata = async () => {
            const  id_akun = await  AsyncStorage.getItem('id_akun');
            console.log(id_akun)
              var urlAksi = 'https://isecuritydaihatsu.com/api/employe?id=' + id_akun ;
                fetch(urlAksi,{
                    headers : {
                        'keys-isecurity' : 'isecurity' ,
                    } ,
                })
                .then((response) => response.json())
                .then((json) => {
                  const hasil =  json.result[0] ;
                //   console.log(hasil.id_biodata)
                  setStatus({npk: hasil.npk,
                  no_kta: hasil.no_kta,
                  expired_kta: hasil.expired_kta,
                  jabatan: hasil.jabatan,
                  status_anggota: hasil.status_anggota,
                  status_kta: hasil.status_kta,
                  area_kerja: hasil.area_kerja,
                  sub_area: hasil.sub_area,
                  wilayah: hasil.wilayah,
                  tgl_masuk_sigap: hasil.tgl_masuk_sigap,
                  tgl_masuk_adm: hasil.tgl_masuk_adm }) 
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

            <View>
                <TextInput
                  label="NPK"
                  editable={false}
                  placeholder="NPK"
                  value={status.npk}
                ></TextInput>
                <TextInput
                  label="NO KTA"
                  editable={false}
                  placeholder="NO KTA"
                  value={status.no_kta}
                ></TextInput>
                <TextInput
                  label="EXPIRED KTA"
                  editable={false}
                  placeholder="EXPIRED KTA"
                  value={status.expired_kta}
                ></TextInput>
                <TextInput
                  label="JABATAN"
                  editable={false}
                  placeholder="JABATAN"
                  value={status.jabatan}
                ></TextInput>
                <TextInput
                  label="STATUS ANGGOTA"
                  editable={false}
                  placeholder="STATUS ANGGOTA"
                  value={status.status_anggota}
                ></TextInput>
                <TextInput
                  label="STATUS KTA"
                  editable={false}
                  placeholder="STATUS KTA"
                  value={status.status_kta}
                ></TextInput>
                <TextInput
                  label="AREA KERJA"
                  editable={false}
                  placeholder="AREA KERJA"
                  value={status.area_kerja}
                ></TextInput>
                <TextInput
                  label="WILAYAH"
                  editable={false}
                  placeholder="WILAYAH"
                  value={status.wilayah}
                ></TextInput>
                <TextInput
                  label="TANGGAL MASUK SIGAP"
                  editable={false}
                  placeholder="TANGGAL MASUK SIGAP"
                  value={status.tgl_masuk_sigap}
                ></TextInput>
                <TextInput
                  label="TANGGAL MASUK ADM"
                  editable={false}
                  placeholder="TANGGAL MASUK ADM"
                  value={status.tgl_masuk_adm}
                ></TextInput>
        </View>
        </ScrollView>

      }
      </>

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
        flexWrap: 'wrap' ,
        marginLeft : 2 ,
        backgroundColor : '#fff'
    }  
  })

