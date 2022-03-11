import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet ,  Image , TouchableOpacity , ActivityIndicator , BackHandler} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
// import ImagePicker from 'react-native-image-picker';
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
export default function Poto({navigation , route }) {
const [imgUrl , setImgUrl ] = useState('');
const [filePath, setFilePath] = useState({});
const [loading,setLoading] = useState(true)
    useEffect(() => {

        const getPoto = async () => {
            const  status = await  AsyncStorage.getItem('token');
              console.log(status);
              var urlAksi = 'https://isecuritydaihatsu.com/api/poto?id=' + status ;
                fetch(urlAksi,{
                    headers : {
                        'keys-isecurity' : 'isecurity' ,
                    } ,
                })
                .then((response) => response.json())
                .then((json) => {
                    setImgUrl(json.url);
                    console.log(json.url)
                })
          }
          getPoto();

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
      },3000)
    }
    showLoad();
    //
    return (
      <>
      {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <View style={styles.container}>
              <Image style={{height:450 ,width:400}} source={{uri: `${imgUrl}`}}/>
            </View>
      }
    </>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      
  })

