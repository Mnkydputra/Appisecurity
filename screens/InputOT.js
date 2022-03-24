import React, { Component , useState , useEffect , useRef } from 'react';
import { View, Text , StyleSheet , TouchableOpacity , Platform  , Dimensions} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker ,} from '@react-native-picker/picker';
import { TextInput , Headline, Card} from "react-native-paper";
import DatePicker from 'react-native-datepicker';
import Button from "../src/component/Button";
import SelectPicker from 'react-native-form-select-picker';

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

    const [npkKorlap, setNPKkorlap] = useState();
    const [daftarKorlap , setLisKorlap] = useState([]);
    const [jamOT, setJamOT] = useState();

    const [addressToken , setAddressToken ] = useState()

    //   datetime
      const [date ,setDate ] = useState(new Date());
      const [tglLembur , setTglLembur] = useState(new Date())
      const [mode, setMode ] = useState('time');
      const [show ,setShow ] = useState({date1 : false , date2 : false });
      const [text ,setText ] = useState({time1 : '' , time2 : ''});
      const [mulai ,setMulai ] = useState('00:00:00');
      const [selesai ,setSelesai ] = useState('00:00:00');
    //

    // get token korlap for send notification approval
      const listKorlap = async () => {
          // let wil = route.params.wilayah 
          try {
            var urlAksi = 'https://isecuritydaihatsu.com/api/tokenKorlap?wilayah=WIL2';
            // var urlAksi = 'https://isecuritydaihatsu.com/api/tokenKorlap?wilayah=' + wil;
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
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          // console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
    }

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
      console.log(npkKorlap);
      try {
        var urlAksi = 'https://isecuritydaihatsu.com/api/ambilToken?npk=' + npkKorlap;
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
              fetch('https://exp.host/--/api/v2/push/send',{
                method : 'POST' ,
                headers : {
                    Accept : 'application/json' ,
                    'Accept-encoding' : 'gzip, deflate' ,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(
                    { 
                        to : json.result.token , 
                        title : 'Approval Lemburan' ,
                        body  : 'Dasep Depiyawan AGT (HO) Mengajukan Lembur' ,
                        data : {data : 'goes here'} ,
                        _displayInForeground : false 
                    }
                ),
            })
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
        <Text style={styles.text}>Tanggal Overtime</Text>
              {/* <DatePicker
                style={styles.datePickerStyle}
                date={date}
                mode="date"
                value = ""
                placeholder="select date"
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
                    fontSize: 17,
                    color: "gray"
                  },
                  dateText: {
                    fontSize: 17,
                    marginLeft: 14
                  }
                }}
                onDateChange={(date) => {
                  setTglLembur(date);
                }}
              /> */}

              
        <TouchableOpacity style={{marginBottom:5}} onPress={() => showMode('time')}>
          <TextInput
            label='Jam Mulai Overtime'
            value={`${mulai}`}
            mode="flat"
            editable={false}
            onChangeText={onChange }
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

          <TouchableOpacity onPress={() => showMode2('time')}>
          <TextInput
            label='Jam Selesai Overtime'
            value={`${selesai}`}
            editable={false}
            onChangeText={onChange2 }
            style={{ backgroundColor:'#fff', }}
          />
          </TouchableOpacity>

          <Text style={[styles.text, {marginTop:10}]}>Pilih Korlap</Text>
          {showKorlap()}

          
          <Button mode="contained"  onPress={sendMessage}>
           <Text style={{color:'#fff'}}>AJUKAN LEMBUR</Text>   
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
    );
  }



  const styles = StyleSheet.create({
      container : {
          flex : 1 ,
          backgroundColor:'#fff' ,
          margin:2 
          // justifyContent : 'center' ,
          // alignItems : 'center'
      } ,
      
      datePickerStyle: {
        width: windowWidth  , 
      },
      text: {
        textAlign: 'left',
        width: 230,
        marginLeft : 10 ,
        fontSize: 12,
        color : "gray"
      }
  })