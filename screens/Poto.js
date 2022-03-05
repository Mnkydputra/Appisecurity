import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , Button} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
export default function Poto({navigation , route }) {

    useEffect(() => {


    }, []);
    return (
        <View style={styles.container}>
        <View style={styles.btn}>
        <View style={{marginRight:4}}>
                    <Button  title='Biodata' onPress={()=> navigation.navigate('Profile')}></Button>
        </View>
        <View style={{marginLeft:4}} >
            <Button title='Status'  onPress={()=> navigation.navigate('Status')}></Button>
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

