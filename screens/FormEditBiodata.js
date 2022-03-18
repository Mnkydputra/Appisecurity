import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , ActivityIndicator , Alert, Dimensions } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
export default function FormEditBiodata({navigation,route}) {
    const [loading , setLoading ] = useState(true);
    const [ktp , setKTP] = useState('');
    const [kk , setKK] = useState('');
    const [tempat_lahir , setTempatLahir] = useState('');
    const [tanggal_lahir , setTanggalLahir] = useState('');
    const [email , setEmail] = useState('');
    const [no_hp , setNoHP] = useState('');
    const [no_emergency , setNoEmergency] = useState('');
    const [wait , setWaiting ] = useState(false)
    useEffect(() => {
          try {
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
                    setKK(hasil.kk);
                    setKTP(hasil.ktp);
                    setTempatLahir(hasil.tempat_lahir);
                    setTanggalLahir(hasil.tanggal_lahir)
                    setEmail(hasil.email)
                    setNoHP(hasil.no_hp)
                    setNoEmergency(hasil.no_emergency)
                  })
            }
            getBiodata();
          }catch(error){
            alert(error.message)
          }

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
      },4000)
    }
    showLoad();
    //

    const updateBiodata = async () => {
      if(tempat_lahir === '' || tempat_lahir === null){
        Alert.alert("Perhatian!", "Field Tempat Lahir Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(tanggal_lahir === '' || tanggal_lahir === null){
        Alert.alert("Perhatian!", "Field Tanggal Lahir Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(ktp === "" || ktp === null){
        Alert.alert("Perhatian!", "Field KTP  Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(kk === '' || kk === null){
        Alert.alert("Perhatian!", "Field Kartu Keluarga Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(no_hp === '' || no_hp === null){
        Alert.alert("Perhatian!", "Field No Handphone Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(no_emergency === '' || no_emergency === null ){
        Alert.alert("Perhatian!", "Field No Emergency Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else if(email === '' || email === null){
        Alert.alert("Perhatian!", "Field Email Kosong", [
          { text: "YA", onPress: () => null },
        ]);
      }else {
        try {
          setWaiting(true);
          const id_akun = await AsyncStorage.getItem('id_akun');
          var url = 'https://isecuritydaihatsu.com/api/updateBiodata';
              fetch(url,{
                  headers : {
                      'keys-isecurity' : 'isecurity' ,
                      'Content-Type': 'application/json' , 
                  } ,
                  method : 'PUT' , 
                  body : JSON.stringify({
                    "id"            : id_akun ,
                    "ktp"           : ktp , 
                    "kk"            : kk ,
                    "tempat_lahir"  : tempat_lahir ,
                    "tanggal_lahir" : tanggal_lahir,
                    "no_hp"         : no_hp ,
                    "no_emergency"  : no_emergency ,
                    "email"         : email
                  })
              })
              .then((response) => response.json())
              .then((json) => {
                console.log(json.status);
                // setWaiting(false);
                if(json.status === "ok"){
                  Alert.alert("Berhasil!", "UPDATE SUKSES", [
                    { text: "YA", onPress: () => setWaiting(false) },
                  ]);
                }else {
                  Alert.alert("Gagal!", "TERJADI KESALAHAN", [
                    { text: "YA", onPress: () => setWaiting(false) },
                  ]);
                }
              })
        }catch(error){
            alert(error.message)
        }
      }
        
    }


    return (
      <>
        {
          loading ?  
          
          <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
          :
          <View style={{backgroundColor:'#fff'}}>
              <View style={styles.marginTextInput}>
              <TextInput label="Tempat Lahir" 
                value={tempat_lahir}
                onChangeText={text => setTempatLahir(text)}
                placeholder="Tempat Lahir" placeholderColor="#c4c3cb">
                </TextInput>
              </View>

                <View style={styles.marginTextInput}>
                  <Text style={styles.text}>Tanggal Lahir</Text>
                      <DatePicker
                      style={styles.datePickerStyle}
                        date={tanggal_lahir}
                        mode="date"
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
                            borderColor : "gray",
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
                          }
                        }}
                        onDateChange={(date) => {
                          setTanggalLahir(date);
                        }}
                      />
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO KTP" 
                  value={ktp}
                  keyboardType="phone-pad"
                  onChangeText={text => setKTP(text)}
                  placeholder="NO KTP" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO KK" 
                  value={kk}
                  keyboardType="phone-pad"
                  onChangeText={ text => setKK(text) }
                  placeholder="NO KK" placeholderColor="#c4c3cb" >
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO HANDPHONE" 
                  value={no_hp}
                  keyboardType="phone-pad"
                  onChangeText={ text => setNoHP(text) }
                  placeholder="NO HANDPHONE" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO EMERGENCY" 
                  value={no_emergency}
                  keyboardType="phone-pad"
                  onChangeText={text => setNoEmergency(text) }
                  placeholder="NO EMERGENCY" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="Email" 
                  value={email}
                  keyboardType="email-address"
                  onChangeText={ text => setEmail(text) }
                  placeholder="Email" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <Button mode="contained" onPress={updateBiodata} style={{marginTop:20}}>
                {wait ? 
                      <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
                      : 
                        <Text style={{color:'#fff'}}>UPDATE BIODATA </Text>   
                  }
                </Button>
      </View>
        }
      </>
      
    );
  }


  const styles = StyleSheet.create({
    container : {
        flex :2 , 
    } ,
    marginTextInput : {
      marginBottom: -9
    },
    title: {
      textAlign: 'left',
      fontSize: 20,
      marginLeft:10 ,
      fontWeight: 'bold',
    },
    datePickerStyle: {
      width: windowWidth - 10 ,
      margin:5 
    },
    text: {
      textAlign: 'left',
      width: 230,
      fontSize: 12,
      marginLeft : 8,
      color : "#8c8685"
    }
})
