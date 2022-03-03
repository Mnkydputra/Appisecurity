import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler , FlatList , TouchableOpacity} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
export default function Profile({navigation , route }) {


    //tombol kembali 
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }


    useEffect(() => {
 
          const handleBackPress = () => {
            navigation.navigate('Home');
            return true;
          };
        
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);

    const BULAN = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER" , "DESEMBER"]; 

    const [bln,setBln] =useState([
      { id : '01' , bulan : 'Januari'} ,
      { id : '02' , bulan : 'Februari'} ,
      { id : '03' , bulan : 'Maret' } ,
      { id : '04' , bulan : 'April'} ,
      { id : '05' , bulan : 'Mei'} ,
      { id : '06' , bulan : 'Juni' } ,
      { id : '07' , bulan : 'Juli' } ,
      { id : '08' , bulan : 'Agustus' } ,
      { id : '09' , bulan : 'September'} ,
      { id : '10' , bulan : 'Oktober' } ,
      { id : '11' , bulan : 'November' } ,
      { id : '12' , bulan : 'Desember'} 
    ])


    return (
      <Background>
         <View style={styles.container}>
         <View>
           <Text>{route.params.nama}</Text>
         </View>
          <FlatList 
            data={bln}

            renderItem = {({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ViewAbsen' , {
                  bulan : item.id ,
                  npk : route.params.npk ,
                  wilayah : route.params.wilayah 
                })} >
                <View  style={styles.listItem} >
                  <Text >{item.bulan}</Text>
                </View>
            </TouchableOpacity>
            )}
          />
        </View> 
      </Background>
    );

  }

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 2,
      paddingTop: 50,
    },
    listItem: {
      backgroundColor: "#ddd",
      borderWidth: 1,
      borderColor: "#333",
      color : '#fff' ,
      padding: 25,
    },
  })

