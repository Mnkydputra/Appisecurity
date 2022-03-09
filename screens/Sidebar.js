import React, { Component , useState , useEffect  } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler , 
    FlatList} from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import  AsyncStorage  from "@react-native-async-storage/async-storage";
    export default function Sidebar ({navigation,route}) {

    const [data , setData ] =  useState([
        {id:1, title:"Ubah Status" , link : 'Edit Status' },
        {id:2, title:"Ubah Profile" , link : 'Edit Profile'},
        {id:3, title:"Logout" , link : 'Logout'},
    ])
    const [loading,setLoading] = useState(true)
    const [imgUrl , setImgUrl ] = useState('');

    useEffect(() => {
      const handleBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    },[])


    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();

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
              <Image style={styles.avatar} source={{uri: `${imgUrl}`}}/>
              <Text style={styles.name}>{route.params.nama}</Text>
              <Text style={styles.name}>{route.params.npk}</Text>
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
                    <Icon style={[styles.icon,{fontSize:10}]} name="edit"></Icon>
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
      backgroundColor: "#EE82EE",
    },
    headerContent:{
      padding:30,
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
    //   shadowColor: 'black',
    //   shadowOpacity: .2,
    //   shadowOffset: {
    //     height:1,
    //     width:-2
    //   },
      elevation:2
    },
    username:{
      color: "#20B2AA",
      fontSize:22,
      alignSelf:'center',
      marginLeft:10
    }
  });