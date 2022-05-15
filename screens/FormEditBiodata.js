import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler ,  ActivityIndicator , Alert, Dimensions , ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
// import TextInput from "../src/component/TextInput";
import { TextInput , Headline, Card} from "react-native-paper";
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
    const [gol_darah , setGolDarah] = useState('');
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
                    setNoEmergency(hasil.no_emergency);
                    setGolDarah(hasil.gol_darah)
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
                    "email"         : email ,
                    "gol_darah"     : gol_darah,
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
          <ScrollView  style={styles.container}>

          <View  style={styles.container2}>
              <View style={styles.marginTextInput}>
              <TextInput label="Tempat Lahir" 
                value={tempat_lahir}
                style={styles.textBg}
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
                            borderColor : "#ccc",
                            alignItems: "flex-start",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                          },
                          placeholderText: {
                            fontSize: 12,
                            color: "gray"
                          },
                          dateText: {
                            fontSize: 12,
                          }
                        }}
                        onDateChange={(date) => {
                          setTanggalLahir(date);
                        }}
                      />
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="Golongan Darah" 
                  value={gol_darah}
                  style={styles.textBg}
                  keyboardType="text"
                  onChangeText={text => setGolDarah(text)}
                  placeholder="Golongan Darah" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO KTP" 
                  value={ktp}
                  style={styles.textBg}
                  keyboardType="phone-pad"
                  onChangeText={text => setKTP(text)}
                  placeholder="NO KTP" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO KK" 
                  value={kk}
                  style={styles.textBg}
                  keyboardType="phone-pad"
                  onChangeText={ text => setKK(text) }
                  placeholder="NO KK" placeholderColor="#c4c3cb" >
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO HANDPHONE" 
                  value={no_hp}
                  style={styles.textBg}
                  keyboardType="phone-pad"
                  onChangeText={ text => setNoHP(text) }
                  placeholder="NO HANDPHONE" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="NO EMERGENCY" 
                  value={no_emergency}
                  style={styles.textBg}
                  keyboardType="phone-pad"
                  onChangeText={text => setNoEmergency(text) }
                  placeholder="NO EMERGENCY" placeholderColor="#c4c3cb">
                  </TextInput>
                </View>
                <View style={styles.marginTextInput}>
                <TextInput label="Email" 
                  value={email}
                  style={styles.textBg}
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
      </ScrollView>

        }
      </>
      
    );
  }


  const styles = StyleSheet.create({
    container : {
        flex :1 , 
        // backgroundColor:'#fff' ,
        backgroundColor:'#50C4DE' ,
    } ,
    container2 : {
      backgroundColor:'#fff',
      margin: 10,
      padding:10,
      borderRadius: 10, 
    },
    marginTextInput : {
      // marginBottom: -15
    },
    title: {
      textAlign: 'left',
      fontSize: 20,
      marginLeft:10 ,
      fontWeight: 'bold',
    },
    datePickerStyle: {
      width: windowWidth * 0.90 ,
      margin:5 
    },
    text: {
      textAlign: 'left',
      width: 230,
      fontSize: 12,
      marginLeft : 8,
      color : "#8c8685"
    } ,
    textBg : {
      backgroundColor:'#fff' ,
      fontSize : 12
    }
})
