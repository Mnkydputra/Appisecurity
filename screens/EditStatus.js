import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , TouchableOpacity , ActivityIndicator} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
// import datetimepicker from '@react-native-community/datetimepicker';

import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import TextInput from "../src/component/TextInput";
import BackButton from "../src/component/BackButton";
import { theme } from "../src/core/theme";

import DatePicker from 'react-native-date-picker'
export default function EditProfile ({navigation,route}) {
    const [status , setStatus] = useState({kta: '', expired_kta: '',ktp: '',masuk_adm: '' , masuk_sigap : ''});
    const [kta , setKta] = useState('');
    const [exp_kta , setExpKta] = useState('');
    const [masuk_adm , setMasukAdm] = useState('');
    const [masuk_sigap , setMasukSigap] = useState('');
    const [id_akun , setId ] = useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [loading , setLoading ] = useState(true)
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
            console.log(json)
          })
    }

    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    //


    return (
      <View style={{flex:1}}>
          {loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
          :
          <ScrollView>
            <View style={styles.container}>
            <View style={styles.marginTextInput}>
            <TextInput label="NO KTA" 
              value={kta}
              onChangeText={text =>  setKta(text)}
              placeholder="NO KTA" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
              </TextInput>
            </View>
            <View style={styles.marginTextInput}>
            <TextInput label="EXPIRED KTA" 
              value={exp_kta}
              onChangeText={text => setExpKta(text)}
              placeholder="Ex KTA" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
              </TextInput>
            </View>

            <View style={styles.marginTextInput}>
            <TextInput label="Tanggal Masuk Sigap" 
              value={masuk_sigap}
              onChangeText={text => setMasukSigap(text)}
              placeholder="Tanggal Masuk Sigap" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
              </TextInput>
            </View>

            <View style={styles.marginTextInput}>
            <TextInput label="Tanggal Masuk ADM" 
              value={masuk_adm}
              onChangeText={text => setMasukAdm( text )}
              placeholder="Tanggal Masuk ADM" placeholderColor="#c4c3cb" style={[styles.loginFormTextInput , {height:50, fontSize: 14 }] }>
              </TextInput>
            </View>

            <Button mode="contained"  onPress={update}>
              Update Data
            </Button>
            </View>
          </ScrollView>
          }
      </View>
      

    );
}


const styles = StyleSheet.create({
    container : {
        flex :2 , 
        margin: 14 ,
    } ,
    marginTextInput : {
        marginBottom:-17
    }
})
