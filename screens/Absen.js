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
          navigation.navigate('Approval' , {
            nama: route.params.nama,
            npk: route.params.npk,
            id_akun: route.params.id_akun,
            wilayah: route.params.wilayah,
            area_kerja: route.params.area_kerja,
            jabatan: route.params.jabatan,
        })
      }
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.card}>
              <Image style={styles.image} source={ require('../src/img/article.png')}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'Pengajuan (OT & SKTA)'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> navigation.navigate('Pengajuan' , {
                    nama: route.params.nama,
                    npk: route.params.npk,
                    id_akun: route.params.id_akun,
                    wilayah: route.params.wilayah,
                    area_kerja: route.params.area_kerja,
                    jabatan: route.params.jabatan,
                })}>
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} >
              <Image style={styles.image} source={require("../src/img/hourglass.png")}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'Status Overtime'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={ goTostatus   } >
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} >
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

            <TouchableOpacity style={styles.card} >
              <Image style={styles.image} source={ require('../src/img/clipboard.png')}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{'Status Pengajuan'}</Text>
                <TouchableOpacity style={styles.followButton} onPress={ () => navigation.navigate('Status Pengajuan' , {
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
        backgroundColor:"#50C4DE"
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
        color:"#000",
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
        padding:5,
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
        fontSize:13,
      },
  
  })