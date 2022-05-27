import React, { Component  ,useState , useEffect} from 'react';
import { View, Text , StyleSheet , TouchableOpacity , FlatList , Platform  , Dimensions ,Alert ,BackHandler , Image} from 'react-native';
import ColorfulCard from "react-native-colorful-card";
export default function Pengajuan({navigation,route}) {
    useEffect(() => {
          const handleBackPress = () => {
            navigation.goBack();
            return true;
          };
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          };
        }, []);


    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <TouchableOpacity style={[styles.card , {backgroundColor:'#fff'} ]}>
                <Image style={styles.image} source={ require('../src/img/workaholic.png')}/>
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{'Pengajuan Overtime '}</Text>
                    <TouchableOpacity style={styles.followButton} onPress={()=> navigation.navigate('Input Overtime' , {
                        nama: route.params.nama,
                        npk: route.params.npk,
                        id_akun: route.params.id_absen,
                        wilayah: route.params.wilayah,
                        area_kerja: route.params.area_kerja,
                        jabatan: route.params.jabatan,
                    })}>
                    <Text style={styles.followButtonText}>AJUKAN</Text>  
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card , {backgroundColor:'#fff'} ]}>
                <Image style={styles.image} source={ require('../src/img/absent.png')}/>
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{'Pengajuan SKTA'}</Text>
                    <TouchableOpacity style={styles.followButton} onPress={()=>  navigation.navigate('Input SKTA' , {
                        nama: route.params.nama,
                        npk: route.params.npk,
                        id_akun: route.params.id_absen,
                        wilayah: route.params.wilayah,
                        area_kerja: route.params.area_kerja,
                        jabatan: route.params.jabatan,
                    }) }>
                    <Text style={styles.followButtonText}>AJUKAN</Text>  
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            

        </View>
      </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex : 1  ,
        backgroundColor:'#50C4DE'
    } ,
    row : {
    } ,
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
        fontSize:16,
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
