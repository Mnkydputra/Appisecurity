import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler , FlatList , TouchableOpacity , Dimensions , ActivityIndicator} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default function Profile({navigation , route }) {


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

    const BULAN = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER" , "DESEMBER"]; 
    const [loading,setLoading] = useState(true)
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

    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    //

    return (
      <Background>
      {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
         <View style={styles.container}>
          <FlatList 
          style={{width : windowWidth }}
            data={bln}
            renderItem = {({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('View Absen' , {
                  bulan : item.id ,
                  npk : route.params.npk ,
                  wilayah : route.params.wilayah 
                })} >
                <View  style={styles.listItem} >
                  <Text style={{color:'#fff' , fontSize:20}} >{item.bulan}</Text>
                  <View style={{flexDirection:'row' , display:'flex'}}>
                    <Icon name="chevron-right" style={{color:'#fff'}}></Icon>
                  </View>
                </View>
            </TouchableOpacity>
            )}
          />
        </View> 
      }
      </Background>
    );

  }

  const styles = StyleSheet.create({
    container: {
      flex : 1 
    },
    listItem: {
      backgroundColor: "#5d7987",
      borderWidth: 1,
      borderColor: "#000",
      height: 60  ,
      display: 'flex' ,
      padding : 15 ,
    },
  })

