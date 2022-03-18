import React, { Component , useState , useEffect  } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler , 
    FlatList, Button} from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import  AsyncStorage  from "@react-native-async-storage/async-storage";
    import * as ImagePicker from 'expo-image-picker';
    import FastImage from 'react-native-fast-image'

    export default function Sidebar ({navigation,route}) {

    const [data , setData ] =  useState([
        {id:1, title:"Ubah Status" , link : 'Edit Status' },
        {id:2, title:"Ubah Profile" , link : 'Edit Profile'},
        {id:3, title:"Logout" , link : 'Logout'},
    ])
    const [loading,setLoading] = useState(true)
    const [imgUrl , setImgUrl ] = useState(null);
    const [filePath, setFilePath] = useState({});
    const [image, setImage] = useState(null);
    const [loadUpload , setUploadLoad ] = useState(false);

    const getPoto = async () => {
      const  id_akun = await  AsyncStorage.getItem('token');
        // console.log(id_akun);
        try {
          var urlAksi = 'https://isecuritydaihatsu.com/api/poto?id=' + id_akun ;
            fetch(urlAksi,{
                headers : {
                    'keys-isecurity' : 'isecurity' ,
                } ,
            })
            .then((response) => response.json())
            .then((json) => {
              if(json === null || json.poto === null){
                setImgUrl('https://png.pngtree.com/element_our/20200701/ourlarge/pngtree-vector-security-personnel-image_2277454.jpg');
              }else {
                const url = json.url ;
                const poto = json.poto ;
                const img = url + poto  + '?time=' + new Date();
                setImgUrl(img);
                console.log(img)
                // setImgUrl(poto);
              }
            })
        }catch(error){
          alert(error.message)
        }
      }
      getPoto();
    //
    
    useEffect(() => {
      const handleBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    },[])

    const pickImage = async () => {
      const id_akun = await AsyncStorage.getItem('id_akun');
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 6],
        quality: 1,
      });
  
      // console.log(result);
  
      if (!result.cancelled) {
        setUploadLoad(true);
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
  
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        
        // Upload the image using the fetch and FormData APIs
          let formData = new FormData();
          // Assume "photo" is the name of the form field the server expects
          formData.append('image', { uri: localUri, name: filename, type } );
          formData.append('id_akun' , id_akun );
  
          const url = "https://isecuritydaihatsu.com/api/uploadImage" ;
          try{
            fetch(url, {
              method: 'POST',
              body: formData,
              headers: {
                'content-type'     : 'multipart/form-data',
                'keys-isecurity'   : 'isecurity'
              },
            })
            .then((response) => response.json())
            .then((json) => {
              if(json.message === 'success'){
                 setUploadLoad(false);
                 alert(json.message);
                 setImage(localUri);
               }else {
                 alert(json.message)
               }
            })
            // console.log(localUri)
          }catch(error){
            alert(error.message)
          }
      }
    };


    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();



    return (

      <View style={{flex:1}}>
       { loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
        
          <Image style={styles.avatar} source={{
                uri :   `${imgUrl}` ,
             }} 
             transition={false}
          />
              <Text style={styles.username}>{route.params.nama}</Text>
              <Text style={styles.username}>{route.params.jabatan}</Text>
              <Button style={{backgroundColor:'red'}} title='Upload Poto' onPress={pickImage}></Button>
              {
                loadUpload ? 
                 <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
                :
                null
              }
                
          </View>
        </View>

        <View style={styles.body}>
          <FlatList 
            style={styles.container} 
            enableEmptySections={true}
            data={data}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate( `${item.link}` , {
                    npk : '',
                  })}>
                  <View style={styles.box}>
                    {/* <Image style={styles.icon} source={{uri: item.image}}/> */}
                    <Icon style={[styles.icon,{fontSize:10}]} name={
                      item.title === 'Logout' ? 
                        'lock'
                      :
                        'edit'
                    }></Icon>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.btn} source={{uri: "https://img.icons8.com/customer/office/40"}}/>

                    <Icon style={{marginTop:14}} name="chevron-right" ></Icon>
                  </View>
                </TouchableOpacity>
              )
          }}/>
        </View>
    </View>
       }
      </View>
        
    );
}


const styles = StyleSheet.create({
    header:{
      backgroundColor: "#2e7c94",
    },
    headerContent:{
      padding:20,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "#FF6347",
      marginBottom:10,
    },
    icon:{
    //   width: 40,
    //   height: 40,
      marginTop:10
    },
    title:{
      fontSize:18,
      color:"#000",
      marginLeft:8 ,
      marginTop:3
    },
    btn:{
      marginLeft: 'auto',
    width: 40,
      height: 40,
    },
    body: {
      backgroundColor :"#E6E6FA",
    },
    box: {
      padding:5,
      marginBottom:3,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      shadowColor: 'black',
      shadowOpacity: .2,
      shadowOffset: {
        height:1,
        width:-2
      },
      elevation:2
    },
    username:{
      color: "#FFF",
      fontSize:22,
      alignSelf:'center',
      marginLeft:10
    }
  });