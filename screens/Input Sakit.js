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
import * as DocumentPicker from 'expo-document-picker';
const options = ["Apple", "Banana", "Orange"];
const windowWidth = Dimensions.get('window').width;
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

export default function InputSKTA ({navigation , route}){
    const [loading, setLoading] = useState(false);
    const [npkKorlap, setNPKkorlap] = useState();
    const [daftarKorlap , setLisKorlap] = useState([]);


    //berkas
    const [berkas, setBerkas] = useState('Upload Surat Dokter (Klik disini)');
    const [dokumen , setDokumen] = useState('');
    const [nameFile , setFileName] = useState('');
    const [tglSakit, setTglSakit] = useState('')
    const [alasan ,setAlasan ] = useState();

    // get list korlap
      const listKorlap = async () => {
          let wil = route.params.wilayah 
          try {
            // var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarKorlap?wilayah=WIL2';
            var urlAksi = 'https://isecuritydaihatsu.com/api/DaftarKorlap?wilayah=' + wil;
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




    useEffect(() => {
        listKorlap();
        const handleBackPress = () => {
          navigation.goBack();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, []);


    // ambil data picker
    const _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        setDokumen(result);
        setFileName(result.name);
        console.log(result.name);
    }


    //kirim data pengajuan sakit 
    const sendMessage = async (token) => {
      setLoading(true)
      let filename = dokumen.name ;
      let type = dokumen.mimeType ;
      let localUri = dokumen.uri ;
      let formData = new FormData();
          formData.append('berkas', { uri: localUri, name: filename, type } );
          formData.append('tanggal_ijin' , tglSakit);
          formData.append('npk' , route.params.npk );
          formData.append('id_ijin' , route.params.id_akun );
          formData.append('nama' , route.params.nama );
          formData.append('area' ,route.params.area_kerja );
          formData.append('wilayah' , route.params.wilayah  );
          formData.append('status' , '0' );
          formData.append('ket' , alasan );
          // const url = "http://192.168.8.170:8090/api/ajukanSakit" ;
          const url = "https://isecuritydaihatsu.com/api/ajukanSakit" ;
          try{
            fetch(url, {
              method: 'POST',
              body: formData,
              headers: {
                'content-type'     : 'multipart/form-data',
                'keys-isecurity'   : 'isecurity'
              },
            })
            .then((response) => response.json())
            .then((json) => {
              if(json.status === 'success'){
                Alert.alert("Berhasil!", json.message, [
                    { text: "OK", onPress: () => navigation.navigate('Status Pengajuan',{
                        nama: route.params.nama,
                        npk: route.params.npk,
                        id_akun: route.params.id_absen,
                        wilayah: route.params.wilayah,
                        area_kerja: route.params.area_kerja,
                        jabatan: route.params.jabatan,
                      }
                    )},
                  ]);
                 setLoading(false);
                }else {
                    Alert.alert("Gagal!", json.message, [
                        { text: "OK", onPress: () => setLoading(false) },
                    ]);
               }
            })
          }catch(error){
            alert(error.message)
          }
    }
    const showKorlap = () => {
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
  
    return (

      <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>Tanggal Sakit</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={tglSakit}
                mode="date"
                placeholder="Pilih Tanggal Sakit"
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
                    marginLeft: 14
                  }
                }}
                onDateChange={(date) => {
                  setTglSakit(date)
                }}
              />

          <TextInput
            style={{backgroundColor:'#fff'}}
            label="Keterangan Sakit"
            numberOfLines={2}
            value={ alasan }
            onChangeText={text =>  setAlasan(text)}
          ></TextInput>

         <TouchableOpacity onPress={_pickDocument}>
            <Text style={{marginLeft:10,marginTop:10,color:'blue'}}>{berkas}</Text>
          </TouchableOpacity>
          <TextInput
            style={{backgroundColor:'#fff'}}
            label="surat dokter"
            value={nameFile}
            editable={false}
            onChangeText={text =>  setAlasan(text)}
          ></TextInput>

          <Text style={[styles.text, {marginTop:10}]}> Pilih Korlap</Text>
          {showKorlap()}
 
          <Button mode="contained"  onPress={sendMessage}>
          {loading ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
            : 
           <Text style={{color:'#fff'}}>KIRIM PERIJINAN</Text>   
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
      } ,
      container2 : {
        backgroundColor:'#fff',
        margin: 20,
        padding:15,
        borderRadius: 25, 
      },
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