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

export default function InputSKTA ({navigation , route}){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [loading, setLoading] = useState(false);

    const [npkKorlap, setNPKkorlap] = useState();
    const [daftarKorlap , setLisKorlap] = useState([]);
    const [jamOT, setJamOT] = useState();

    const [addressToken , setAddressToken ] = useState()

    //   datetime
      const [date ,setDate ] = useState(new Date());
      const [tglSKTA , settglSKTA] = useState('')
      const [mode, setMode ] = useState('time');
      const [show ,setShow ] = useState({date1 : false , date2 : false });
      const [text ,setText ] = useState({time1 : '' , time2 : ''});
      const [mulai ,setMulai ] = useState('');
      const [selesai ,setSelesai ] = useState('');
      const [alasan ,setAlasan ] = useState();
      const[masukKerja , setMasukKerja] = useState('');
      const[pulangKerja , setPulangKerja] = useState('');
      const[tglPulang , setTanggalPulang] = useState('');
    //

    // get token korlap for send notification approval
      const listKorlap = async () => {
          let wil = route.params.wilayah 
          try {
            // var urlAksi = 'https://isecuritydaihatsu.com/api/tokenKorlap?wilayah=WIL2';
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
              // console.log(hasil)
            })
          }catch(error){
            alert(error.message)
          }
      }
    // 
    useEffect(() => {
      // 
      let tempDate = new Date();
      const jam = tempDate.getHours() <= 9 ? '0' + tempDate.getHours() :  tempDate.getHours() ;
      const menit = tempDate.getMinutes() <= 9 ? '0' + tempDate.getMinutes() :  tempDate.getMinutes() ;
      const detik = tempDate.getSeconds() <= 9 ? '0' + tempDate.getSeconds() :  tempDate.getSeconds() ;
      let fTime = jam  + ":" + menit + ":" + "00";
      setMulai(fTime);
      setSelesai(fTime);
      // 

      // 
        listKorlap();
      // 
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

        const handleBackPress = () => {
          navigation.goBack();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);
    // timer 
      const onChange = (event,selectDate) => {
        const currentDate = selectDate ||  date 
        setDate(currentDate);
        setShow({date1: false})

        let tempDate = new Date(currentDate);
        const jam = tempDate.getHours() <= 9 ? '0' + tempDate.getHours() :  tempDate.getHours() ;
        const menit = tempDate.getMinutes() <= 9 ? '0' + tempDate.getMinutes() :  tempDate.getMinutes() ;
        const detik = tempDate.getSeconds() <= 9 ? '0' + tempDate.getSeconds() :  tempDate.getSeconds() ;
        let fTime = jam  + ":" + menit + ":" + "00";
        setMulai(fTime);
      }
      const showMode = (currentMode) => {
        setShow({date1 : true});
        setMode(currentMode)
      }

      const onChange2 = (event,selectDate) => {
        const currentDate = selectDate ||  date 
        setDate(currentDate);
        setShow({date2: false})

        let tempDate = new Date(currentDate);
        const jam = tempDate.getHours() <= 9 ? '0' + tempDate.getHours() :  tempDate.getHours() ;
        const menit = tempDate.getMinutes() <= 9 ? '0' + tempDate.getMinutes() :  tempDate.getMinutes() ;
        const detik = tempDate.getSeconds() <= 9 ? '0' + tempDate.getSeconds() :  tempDate.getSeconds() ;
        let fTime = jam  + ":" + menit + ":" + "00";
        setSelesai(fTime);
      }
      const showMode2 = (currentMode) => {
        setShow({date2 : true});
        setMode(currentMode)
      }
    // 

    const sendMessage = async (token) => {
      setLoading(true)
      if(tglSKTA === '' || tglSKTA == null){
        Alert.alert("Perhatian!", 'isi tanggal overtime', [
          { text: "OK", onPress: () => null },
        ]);
      }else if(alasan === ''){
        Alert.alert("Perhatian!", 'isi alasan overtime', [
          { text: "OK", onPress: () => null },
        ]);
      }else {
        try {
          var urlAksi = 'https://isecuritydaihatsu.com/api/ambilToken?npk=' + npkKorlap;
          fetch(urlAksi,{
              headers : {
                  'keys-isecurity' : 'isecurity' ,
              } ,
          })
          .then((response) => response.json())
          .then((json1) => {
            //kirim data pengajuan skta  
            const link = 'https://isecuritydaihatsu.com/api/ajukanSKTA' ;
            fetch(link,{
              method : 'POST'  ,
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'  ,
                'keys-isecurity' : 'isecurity' ,
              } ,
              body : "npk=" + route.params.npk  + "&wilayah=" + route.params.wilayah + "&area=" + route.params.area_kerja + "&in=" + mulai + "&out=" + selesai + "&date_in=" + tglSKTA + "&date_out=" + tglPulang + "&keterangan=" + alasan
            })
            .then((response) => response.json() )
            .then((json) => {
              console.log(json)
              if(json.status === 'failed'){
                alert(json.message);
                Alert.alert("Gagal!", json.message, [
                  { text: "OK", onPress: () => setLoading(false) },
                ]);
                setLoading(false);
              }else {
                setLoading(false);
                Alert.alert("Berhasil!", json.message, [
                  { text: "OK", onPress: () => navigation.navigate('Home') },
                ]);
                
              }
            })
          })
        }catch(error){
          alert(error.message)
        }
      } 
    }


    const showKorlap = () => {
      console.log(daftarKorlap)
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
        <Text style={styles.text}>Tanggal Masuk</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={tglSKTA}
                mode="date"
                placeholder="Pilih Tanggal Masuk"
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
                  var urlAksi = 'https://isecuritydaihatsu.com/api/detail_absen?wilayah=' + route.params.wilayah + '&npk=' + route.params.npk + '&tanggal=' + date;
                  fetch(urlAksi,{
                      headers : {
                          'keys-isecurity' : 'isecurity' ,
                      } ,
                  })
                  .then((response) => response.json())
                  .then((json) => {
                    console.log(json)
                      if(json.status === 'success'){
                          const hasil = json.result ;
                          setMasukKerja(hasil.in_time);
                          setPulangKerja(hasil.out_time);
                          setMulai(hasil.in_time);
                          setSelesai(hasil.out_time);
                      }else {
                          setMasukKerja('');
                          setPulangKerja('');
                          setMulai('');
                          setSelesai('');
                      }
                  })
                   settglSKTA(date)
                }}
              />
              
        <TouchableOpacity style={{marginBottom:5}} onPress={() => showMode('time')}>
          <TextInput
            label='Edit Jam Masuk'
            value={`${mulai}`}
            mode="flat"
            editable={false}
            onChangeText={ onChange }
            style={{ backgroundColor:'#fff',  }}
            customStyles = {{
              TextValue : {
                marginLeft: 20 ,
                fontSize : 14 
              } , 
              label : {
                marginLeft : 20 ,
              }
            }}
          />
          </TouchableOpacity>


        {/* tanggal pulang */}
        <Text style={styles.text}>Edit Tanggal Pulang</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={tglPulang}
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
                    marginLeft: 14
                  }
                }}
                onDateChange={(date) => {
                   setTanggalPulang(date)
                }}
              />
          <TouchableOpacity onPress={() => showMode2('time')}>
          <TextInput
            label='Edit Jam Pulang'
            value={`${selesai}`}
            editable={false}
            onChangeText={onChange2 }
            style={{ backgroundColor:'#fff', }}
          />
          </TouchableOpacity>

          <TextInput
            style={{backgroundColor:'#fff'}}
            label="Alasan Tidak Absen"
            numberOfLines={2}
            value={ alasan }
            onChangeText={text =>  setAlasan(text)}
          ></TextInput>

          <Text style={[styles.text, {marginTop:10}]}>Pilih Korlap</Text>
          {showKorlap()}
          
          <Button mode="contained"  onPress={sendMessage}>
          {loading ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
            : 
           <Text style={{color:'#fff'}}>KIRIM SKTA</Text>   
          }
          </Button>


      {show.date1 && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChange}
        ></DateTimePicker>
      )}

      {show.date2 && (
        <DateTimePicker
          testID='dateTimePicker2'
          value={date}
          mode={'time'}
          is24Hour={true}
          display='default'
          onChange={onChange2}
        ></DateTimePicker>
      )}
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