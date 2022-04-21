import React, { Component , useState , useEffect , useRef } from 'react';
import { View, Text , StyleSheet , TouchableOpacity , Platform  , Dimensions ,Alert ,BackHandler} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker ,} from '@react-native-picker/picker';
import { TextInput , Headline, Card} from "react-native-paper";
import DatePicker from 'react-native-datepicker';
import Button from "../src/component/Button";
import SelectPicker from 'react-native-form-select-picker';
const { width, height } = Dimensions.get("window");

const options = ["Apple", "Banana", "Orange"];
const windowWidth = Dimensions.get('window').width;
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

export default function InputOT ({navigation , route}){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [loading, setLoading] = useState(false);

    const [npkKorlap, setNPKkorlap] = useState();
    const [npkAGT, setNPKAGT] = useState();
    const [daftarKorlap , setLisKorlap] = useState([]);
    const [daftarAGT , setLisAGT] = useState([]);

    //   datetime
      const [date ,setDate ] = useState(new Date());
      const [tglCuti , settglCuti] = useState('')
      const [show ,setShow ] = useState({date1 : false , date2 : false });
      const [alasan ,setAlasan ] = useState();

    // get token korlap for send notification approval
      const listKorlap = async () => {
        //   let wil = route.params.wilayah 
          try {
            var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarKorlap?wilayah=WIL2';
            // var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarKorlap?wilayah=' + wil;
            fetch(urlAksi,{
                headers : {
                    'keys-isecurity' : 'isecurity' ,
                } ,
            })
            .then((response) => response.json())
            .then((json) => {
              const hasil =  json.result;
              setLisKorlap(hasil)
            })
          }catch(error){
            alert(error.message)
          }
      }

      // daftar anggota pengganti bs / cuti
      const listAnggota = async () => {
        //   let wil = route.params.wilayah 
          try {
            var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarAnggota?area=VLC';
            // var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarAnggota?area=' + wil;
            fetch(urlAksi,{
                headers : {
                    'keys-isecurity' : 'isecurity' ,
                } ,
            })
            .then((response) => response.json())
            .then((json) => {
              const hasil =  json.result;
              setLisAGT(hasil)
              // console.log(hasil)
            })
          }catch(error){
            alert(error.message)
          }
      }
    useEffect(() => {
      // 
        listKorlap();
        listAnggota();
      // 
        const handleBackPress = () => {
          navigation.goBack();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, []);



    //kirim pengajuan cuti 
    const sendMessage = async (token) => {
      setLoading(true)
      if(tglCuti === '' || tglCuti == null){
        Alert.alert("Perhatian!", 'isi tanggal cuti', [
          { text: "OK", onPress: () => null },
        ]);
        setLoading(false);
      }else if(alasan === ''){
        Alert.alert("Perhatian!", 'isi alasan cuti', [
          { text: "OK", onPress: () => null },
        ]);
        setLoading(false);
      }else {
        try {
            //kirim data pengajuan cuti
            const link = 'https://isecuritydaihatsu.com/api/ajukanCuti' ;
            // const link = 'http://192.168.8.170:8092/api/ajukanCuti' ;
            fetch(link,{
              method : 'POST'  ,
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'  ,
                'keys-isecurity' : 'isecurity' ,
              } ,
              body : "npk=" + route.params.npk + "&wilayah="+ route.params.wilayah + "&area="+ route.params.area_kerja + "&tanggal_cuti=" + tglCuti + "&alasan_cuti=" + alasan + "&status=0" + "&pengganti=" + npkAGT + "&nama=" + route.params.nama
            })
            .then((response) => response.json() )
            .then((json) => {
              if(json.status === 'failed'){
                alert(json.message);
                Alert.alert("Gagal!", json.message, [
                  { text: "OK", onPress: () => setLoading(false) },
                ]);
                setLoading(false);
              }else {
                setLoading(false);
                alert(json.message);
                // Alert.alert("Berhasil!", json.message, [
                //   { text: "OK", onPress: () => navigation.navigate('Pengajuan Status',{
                //     // nama: route.params.nama,
                //     // npk: route.params.npk,
                //     // id_akun: route.params.id_absen,
                //     // wilayah: route.params.wilayah,
                //     // area_kerja: route.params.areaKerja,
                //     // jabatan: route.params.jabatan,
                //     }
                //   )},
                // ]);
              }
            })
        }catch(error){
          alert(error.message)
        }
      } 
    }


    const showKorlap = () => {
    //   console.log(daftarKorlap)
      if(daftarKorlap == undefined || daftarKorlap === ''){
        console.log("Sabar dulu")
      }else {
        return (
          <Picker
              style={{
                borderColor : "#b3abab",
                borderBottom : 1 , 
                alignItems: "flex-start",
                borderWidth: 1,
              }}
              selectedValue={npkKorlap}
              onValueChange={(itemValue, itemIndex) =>
                setNPKkorlap(itemValue)
           }>
               {
                  daftarKorlap.map((item) =>
                  <Picker.Item label={`${item.nama}`} value={`${item.npk}`} key={item.npk} />
                  )
               }
            </Picker>
        )
      }
    }

    //daftar anggota 
    const showAnggota = () => {
      if(daftarAGT == undefined || daftarAGT === ''){
        console.log("Sabar dulu")
      }else {
        return (
          <Picker
              style={{
                borderColor : "#b3abab",
                borderBottom : 1 , 
                alignItems: "flex-start",
                borderWidth: 1,
              }}
              selectedValue={npkAGT}
              onValueChange={(itemValue, itemIndex) =>
                setNPKAGT(itemValue)
           }>
               {
                  daftarAGT.map((item) =>
                  <Picker.Item label={`${item.nama}`} value={`${item.npk}`} key={item.npk} />
                  )
               }
            </Picker>
        )
      }
    }


  
    return (
      <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>Tanggal Cuti</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={tglCuti}
                mode="date"
                placeholder="Pilih Tanggal"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: -5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor : "#b3abab",
                    alignItems: "flex-start",
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 12,
                    color: "gray" ,
                    marginLeft : 10 
                  },
                  dateText: {
                    fontSize: 17,
                    marginLeft: 5
                  }
                }}
                onDateChange={(date) => {
                  settglCuti(date)
                }}
              />

          <TextInput
            style={{backgroundColor:'#fff'}}
            label="Alasan Cuti"
            placeholder="Alasan Cuti" placeholderColor="#c4c3cb"
            value={ alasan }
            numberOfLines={3}
            onChangeText={text =>  setAlasan(text)}
          />


          <Text style={[styles.text, {marginTop:10}]}>Pilih Pengganti Selama Cuti</Text>
          {showAnggota()}

          <Text style={[styles.text, {marginTop:10}]}>Pilih Korlap</Text>
          {showKorlap()}
          
          <Button mode="contained"  onPress={sendMessage}>
          { loading ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
            : 
           <Text style={{color:'#fff'}}>INPUT CUTI</Text>   
          }
          </Button>

      </View>
      </View>
    );
  }



  const styles = StyleSheet.create({
      container : {
        flex : 1 ,
        backgroundColor:'#50C4DE' ,
        flexWrap:"wrap",
      },
      container2 : {
        backgroundColor:'#fff',
        margin: 20,
        padding:15,
        borderRadius: 25,
          
    } ,
      datePickerStyle: {
        width: width * 0.80, // 80% of screen's width
      },
      text: {
        textAlign: 'left',
        width: 230,
        marginLeft : 10 ,
        fontSize: 12,
        color : "gray"
      }
  })