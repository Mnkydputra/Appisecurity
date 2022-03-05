import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet ,  Image , TouchableOpacity} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-picker';
import BackButton from "../src/component/BackButton";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";
export default function Poto({navigation , route }) {
const [imgUrl , setImgUrl ] = useState('');
const [filePath, setFilePath] = useState({});
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
                })
          }
          getPoto();
    }, []);


    const chooseFile = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option'
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log(
              'User tapped custom button: ',
              response.customButton
            );
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = {
            //   uri: 'data:image/jpeg;base64,' + response.data
            // };
            setFilePath(source);
          }
        });
      };
    return (
      <Background>

        <View style={styles.container}>
        <View style={styles.btn}>
        <View style={{ marginRight: 4 }}>
              <Button  mode="contained" onPress={() => navigation.navigate("Profile")}>
                Profile
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate("Status")}>
               Status
              </Button>
              <Button mode="contained"  onPress={()=> navigation.navigate('Poto' , {
              nama : biodata.nama 
              })}>
                Poto
              </Button>
        </View>
        </View>
            <View>
                <Text>{ route.params.nama }</Text>
                <Image style={{ width: 250, height: 250}} 
               source={{uri:imgUrl ? imgUrl : null}} />
            </View>

            <View>
            <Image
                source={{uri: filePath.uri}}
                style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                {filePath.uri}
                </Text>
            </View>
        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={chooseFile}>
          <Text style={{color: '#fff'}}>Pilih Image</Text>
        </TouchableOpacity>
        </View>
    </Background>
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

