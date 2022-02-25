import React, { useState ,Component  , useEffect  } from 'react';
import { View, Text , TouchableOpacity , StyleSheet , Image , Dimensions , Button , BackHandler ,  Alert} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default function  Home ({navigation,route}) {
  const [user , setUser] = useState({npk : '' , id_absen : '' , wilayah: '' , areaKerja : '' , jabatan: ''  , nama : ''})

  const [id_ , setId] = useState(null)
  

  useEffect(() => {
    // const backAction = () => {
    //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();


  }, []);
  
  const  logout = async() => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login')
  }


  //ambil data diri anggota untuk akses absensi 
  const getParamsAbsensi = async () => {
    const  status = await  AsyncStorage.getItem('id_akun');
    setId(status);
    var urlAksi = 'https://isecuritydaihatsu.com/api/datadiriAbsensi?id=' + status ;
      fetch(urlAksi,{
          headers : {
              'keys-isecurity' : 'isecurity' ,
          } ,
      })
      .then((response) => response.json())
      .then((json) => {
        const hasil =  json.result ;
        // console.log(hasil.id_biodata)
        setUser({npk :  hasil.npk , id_absen : hasil.id_biodata , wilayah: hasil.wilayah , areaKerja : hasil.area_kerja , jabatan: hasil.jabatan , nama : hasil.nama })
      })
  }
  getParamsAbsensi();
  // end of ambil data diri 
  
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>ABSENSI KERJA ?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Absensi', {
              nama : user.nama  ,
              npk : user.npk ,
              id_akun : user.id_biodata,
              wilayah : user.wilayah ,
              area_kerja : user.areaKerja ,
              jabatan : user.jabatan
            })}>
                <View style={styles.linkAbsen}>
                  <Image style={styles.scanIMG} source={require("../img/scan.png")}></Image>
                  <Text  style={{ fontSize:18 }}>
                    Scan QR Code</Text>
                </View>
            </TouchableOpacity>
        </View>


        <View style={styles.menuBox1}>
          <Image style={styles.icon} source={require("../img/policeman.png")}/>
          <Text style={styles.info}>Profile</Text>
        </View>

        <TouchableOpacity>
        <View style={styles.menuBox} >
          <Image   style={styles.icon} source={require("../img/absensi.png")}/>
          <Text style={styles.info}>Absensi</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/inbox.png")}/>
          <Text style={styles.info}>Inbox</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Course</Text>
        </View>

        

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Ijin</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Patrol</Text>
        </View>

        <View>
          <Text>{ id_ }</Text>
          <TouchableOpacity>
            <Button title='LOGOUT' onPress={logout} ></Button>
          </TouchableOpacity>
        </View>

      </View>
    );
  }


const styles = StyleSheet.create({
  container:{
    flex: 10,
    // marginTop : 10,
    // marginLeft:10 ,
    width : windowWidth ,
    flexDirection: 'row',
    flexWrap: 'wrap' ,
    backgroundColor : '#fff'
  },
  menuBox:{
    backgroundColor: "#F08080",
    width:100,
    height:100,
    borderRadius:30 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:18
  },
  menuBox1:{
    backgroundColor: "#ccc",
    width:100,
    height:100,
    borderRadius:30 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:18
  },
  header:{
    backgroundColor: "#87CEFA",
    width:400,
    height:100,
    marginLeft:4 ,
    borderRadius:20 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12
  },
  linkAbsen : {
    backgroundColor: "#fff",
    width:180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20 ,
    height:50, 
    flexDirection: 'row',
    flexWrap: 'wrap' ,
  },
  icon: {
    width:60,
    height:60,
  },
  scanIMG : {
    width:30,
    marginTop:20,
    height:30,
  },
  info:{
    fontSize:14,
    color: "#fff",
  }
});