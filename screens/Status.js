import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet ,ActivityIndicator , BackHandler} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
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
      <Background>
      {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
        <View style={styles.container}>
        <View style={styles.btn}>
        <View style={{ marginRight: 4 }}>
              <Button  mode="contained" onPress={() => navigation.navigate("Profile")}>
                Profile
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate("Status")}>
               Status
              </Button>
              <Button mode="contained"  onPress={()=> navigation.navigate('Poto' , {
              nama : status.nama 
              })}>
                Poto
              </Button>
        </View>
        </View>
            <View>
                <Text>Status  </Text>
                <Text>NPK : {status.npk}</Text>
                <Text>NO KTA : {status.no_kta}</Text>
                <Text>EXPIRED KTA : {status.expired_kta}</Text>
                <Text>JABATAN : {status.jabatan}</Text>
                <Text>STATUS ANGGOTA : {status.status_anggota}</Text>
                <Text>STATUS KTA : {status.status_kta}</Text>
                <Text>AREA KERJA : {status.area_kerja}</Text>
                <Text>WILAYAH : {status.wilayah}</Text>
                <Text>TANGGAL MASUK SIGAP : {status.tgl_masuk_sigap}</Text>
                <Text>TANGGAL MASUK ADM : {status.tgl_masuk_adm}</Text>

            </View>
        </View>



      }
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
        flexWrap: 'wrap' ,
        marginLeft : 2 ,
        backgroundColor : '#fff'
    }  
  })

