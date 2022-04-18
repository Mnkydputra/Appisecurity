import React, { Component , useState , useEffect , useCallback } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , TouchableOpacity , ActivityIndicator , Alert , Dimensions} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";



import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
// import TextInput from "../src/component/TextInput";
import { TextInput } from "react-native-paper";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get("window");

export default function EditProfile ({navigation,route}) {
    const [status , setStatus] = useState({kta: '', expired_kta: '',ktp: '',masuk_adm: '' , masuk_sigap : ''});
    const [kta , setKta] = useState('');
    const [exp_kta , setExpKta] = useState('');
    const [masuk_adm , setMasukAdm] = useState('');
    const [masuk_sigap , setMasukSigap] = useState('');
    const [id_akun , setId ] = useState('');
    const [loading , setLoading ] = useState(true)
    const [wait , setWaiting ] = useState(false)
    const [tgl1 , setTgl1 ] = useState(new Date());

    //datepicker
 
    // 

    const getBiodata = async () => {
      const  id_akun = await  AsyncStorage.getItem('id_akun');
        var urlAksi = 'https://isecuritydaihatsu.com/api/employe?id=' + id_akun ;
          fetch(urlAksi,{
              headers : {
                  'keys-isecurity' : 'isecurity' ,
              } ,
          })
          .then((response) => response.json())
          .then((json) => {
            const hasil =  json.result[0] ;
              // console.log(hasil)
              setKta(hasil.no_kta)
              setExpKta(hasil.expired_kta)
              setMasukAdm(hasil.tgl_masuk_adm)
              setMasukSigap(hasil.tgl_masuk_sigap)
          })
    }

    useEffect(() => {

          getBiodata();
          const handleBackPress = () => {
            navigation.goBack();
            return true;
          };
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);


    const update = async () => {
      setWaiting(true);
      const id_akun = await AsyncStorage.getItem('id_akun');
      var url = 'https://isecuritydaihatsu.com/api/employe/update';
          fetch(url,{
              headers : {
                  'keys-isecurity' : 'isecurity' ,
                  'Content-Type': 'application/json' , 
              } ,
              method : 'PUT' , 
              body : JSON.stringify({
                'no_kta'            : kta,
                'ex_kta'            : exp_kta,
                'masuk_sigap'       : masuk_sigap,
                'masuk_adm'         : masuk_adm,
                'id'                : id_akun
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
    }

    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    return (
      <View style={{flex:1}}>
          {loading ? 
            <View style={{flex : 1 , justifyContent : 'center' }}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
          :
          <ScrollView style={{backgroundColor:'#50C4DE'}}>
            <View style={styles.container}>
            <View style={styles.marginTextInput}>
            
            <TextInput
              label="NO KTA" 
              value={kta}
              onChangeText={date =>  setKta(date)}
              placeholder="NO KTA" placeholderColor="#c4c3cb"
              style={{ backgroundColor:'#fff',  }}>
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <Text style={styles.text}>Expired  KTA :</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={exp_kta}
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
                    marginLeft: 14
                  }
                }}
                onDateChange={(date) => {
                  setExpKta(date);
                }}
              />


            </View>

            <View style={styles.marginTextInput}>
                    <Text style={styles.text}>Tanggal Masuk Sigap :</Text>
                      <DatePicker
                        style={styles.datePickerStyle}
                        date={masuk_sigap}
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
                          setMasukSigap(date);
                        }}
                      />
            </View>


            <View style={styles.marginTextInput}>
                    <Text style={styles.text}>Tanggal Masuk ADM :</Text>
                      <DatePicker
                      style={styles.datePickerStyle}
                        date={masuk_adm}
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
                          setMasukAdm(date);
                        }}
                      />
            </View>

            

            <Button mode="contained"  onPress={update}>
            {wait ? 
            <Text style={{color:'#fff'}}>Harap Tunggu . . . </Text>
            : 
              <Text style={{color:'#fff'}}>UPDATE DATA </Text>   
            }
            </Button>
            </View>
          </ScrollView>
          }
      </View>
      

    );
}


const styles = StyleSheet.create({
    container : {
        // flex :2 , 
        // margin: 14 ,
        // backgroundColor:'#fff',
        width: width * 0.95, // 80% of screen's width
        height: height * 0.40, // 20% of screen's height
        margin:10,
        borderRadius: 15,
        padding:5,
        backgroundColor:"#fff",
    } ,
    marginTextInput : {
    },
    datePickerStyle: {
      width: windowWidth - 30 , 
    },
    text: {
      textAlign: 'left',
      width: 230,
      fontSize: 12,
      color : "#ccc"
    }
})
