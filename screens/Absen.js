import React, { Component, useState , useEffect } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView ,
    BackHandler} from 'react-native';

export default function Absen ({navigation,route}) {
      //tombol kembali 
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }


    useEffect(() => {
      const handleBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);


    //
    const goTostatus = () => {
      if(route.params.jabatan === 'ANGGOTA'){
        Alert.alert('Perhatian' , 'Hanya bisa di akses Korlap dan PIC');
      }else {
        Alert.alert('Perhatian', 'Oops sistem masih dalam pengembangan')
        // navigation.navigate('Send SKTA')
      }
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.card , {backgroundColor:'#0968a2'} ]}>
              <Image style={styles.image} source={ require('../src/img/article.png')}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'Pengajuan (OT & SKTA)'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> navigation.navigate('Pengajuan' , {
                    nama: route.params.nama,
                    npk: route.params.npk,
                    id_akun: route.params.id_absen,
                    wilayah: route.params.wilayah,
                    area_kerja: route.params.area_kerja,
                    jabatan: route.params.jabatan,
                })}>
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card , {backgroundColor:'#0e9ff7'} ]} >
              <Image style={styles.image} source={require("../src/img/hourglass.png")}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'Status Overtime'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={ goTostatus   } >
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card , {backgroundColor:'#04314d'} ]} >
              <Image style={styles.image} source={ require('../src/img/absen2.png')}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'History Absensi'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={ () => navigation.navigate('Laporan Absen' , {
                    nama: route.params.nama,
                    npk: route.params.npk,
                    id_akun: route.params.id_absen,
                    wilayah: route.params.wilayah,
                    area_kerja: route.params.areaKerja,
                    jabatan: route.params.jabatan,
                })}>
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        backgroundColor:"#ebf0f7"
      },
      contentList:{
        flex:1,
      },
      cardContent: {
        marginLeft:20,
        marginTop:10
      },
      image:{
        width:85,
        height:85,
        // borderRadius:20,
        // borderWidth:2,
        borderColor:"#ebf0f7"
      },
    
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        backgroundColor:"white",
        padding: 10,
        flexDirection:'row',
        borderRadius:20,
      },
    
      name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#fff",
        fontWeight:'bold'
      },
      count:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#6666ff"
      },
      followButton: {
        marginTop:10,
        height:40,
        width:150,
        padding:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#1000ff",
        borderWidth:1,
        borderColor:"#dcdcdc",
      },
      followButtonText:{
        color: "#FFF",
        fontSize:12,
      },
  
  })