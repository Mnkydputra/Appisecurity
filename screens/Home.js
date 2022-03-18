import React, { useState ,Component  , useEffect , useCallback } from 'react';
import { View, Text , TouchableOpacity , Image , Dimensions , Button , BackHandler ,  Alert , Linking , ActivityIndicator , RefreshControl , ScrollView} from 'react-native';
import styles from '../src/component/styles.js';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-paper";

export default function  Home ({navigation,route}) {
  const [user , setUser] = useState({npk : '' , id_absen : '' , wilayah: '' , areaKerja : '' , jabatan: ''  , nama : ''})
  const [id_ , setId] = useState(null)
  const [loading,setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);


  //refresh screen home 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getParamsAbsensi();
    wait(2000).then(() => setRefreshing(false));
  }, []);


    //ambil data diri anggota untuk akses absensi 
    const getParamsAbsensi = async () => {
      const  status = await  AsyncStorage.getItem('token');
      try {
        setId(status);
        if(status === null ){
          console.log('not found data')
        }else {
          var urlAksi = 'https://isecuritydaihatsu.com/api/datadiriAbsensi?id=' + status ;
            fetch(urlAksi,{
                headers : {
                    'keys-isecurity' : 'isecurity' ,
                } ,
            })
            .then((response) => response.json())
            .then((json) => {
              const hasil =  json.result ;
              // console.log(hasil)
              setUser({npk :  hasil.npk , id_absen : hasil.id_biodata , wilayah: hasil.wilayah , areaKerja : hasil.area_kerja , jabatan: hasil.jabatan , nama : hasil.nama })
            })
        }
      }catch(error){
          alert(error.message)
      }
        
    }

    
    //jika token login ada isinya maka program redirect ke Home
    const tokenLogin = async () => {
      const value = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id_akun");
      if (value === null) {
        navigation.navigate("Login");
      }else if(value !== null){
        // console.log(value);
      }
    };

  useEffect(() => {
    let unmounted = false
    tokenLogin();
    //end
    getParamsAbsensi();
  // end of ambil data diri 

    BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert("Perhatian!", "Keluar Aplikasi ?", [
        {
          text: "Batal",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Iya", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    });
   return  function cleanup(){
        unmounted = true ;
        BackHandler.removeEventListener("hardwareBackPress", () => {
          Alert.alert("Perhatian!", "Keluar Aplikasi ?", [
            {
              text: "Batal",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Iya", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        })
    }
  }, []);
  


  //patrol link 
  const patrol = async() => {
     const status =  await AsyncStorage.getItem('patrol');
     const npk    =  await AsyncStorage.getItem('token');
     const token_patrol    =  await AsyncStorage.getItem('token_patrol');
     
     if(status === 'Y'){
     Alert.alert('Perhatian' , 'Lanjut Patroli', [
      {
        text: "Batal",
        onPress: () => console.log(token_patrol),
        style: "cancel"
      },
      { text: "Iya", onPress: () => Linking.openURL('https://isecuritydaihatsu.com/Ipatrol/Login_?id=' + npk + '&pwd=' + token_patrol ) }
    ]);
    }else {
      Alert.alert('Perhatian' , 'Patrol Hanya untuk danru');
    }
  }
  //


  //informasi menu masih pengembangan 
  const informasi = async() => {
    alert('Oops , sistem masih pengembangan');
  }
  //

//fungsi loading 
const showLoad = () => {
  setTimeout(() => {
    setLoading(false);
  },3000)
}
showLoad();
//

  
    return (
      
      <View style={styles.container}>
        { loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            
            <>
            <ScrollView
            contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
      
            <View  style={styles.headText} >
            <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Akun", {
                      nama: user.nama,
                      npk: user.npk,
                      id_akun: user.id_absen,
                      wilayah: user.wilayah,
                      area_kerja: user.areaKerja,
                      jabatan: user.jabatan,
                    })
                  }
                >

              <Text style={{fontWeight:'bold'}}>
              <Icon
                name="user-circle"
                backgroundColor="#3b5998" 
                style={{fontSize:25 , marginTop:2}}
              ></Icon>  Hai , <Text style={{textDecorationLine: 'underline'}}>{user.nama}</Text> 
              </Text>
                </TouchableOpacity>
            </View>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Absensi", {
                      nama: user.nama,
                      npk: user.npk,
                      id_akun: user.id_absen,
                      wilayah: user.wilayah,
                      area_kerja: user.areaKerja,
                      jabatan: user.jabatan,
                    })
                  }
                >
                  <View style={styles.linkAbsen}>
                    <Image style={styles.scanIMG} source={require("../src/img/scan.png")}></Image>
                    <Text style={{ fontSize: 20 }}>Absen</Text>
                  </View>
                  <View style={{
                    flex:1 ,
                    position:'absolute' ,
                    }}>
                    <Image style={{
                      width : 100 ,
                      height : 100 , 
                      marginLeft : 125  ,
                      marginTop : -12
                    }} source={require("../src/img/qr.png")}></Image>

                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
              
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profiling", {
                      nama: "dasep",
                    })
                  }
                >
                  <View style={[styles.menuBox, { backgroundColor: "#f0db81" }]}>
                    <Image style={styles.icon} source={require("../src/img/policeman.png")} />
                    <Text style={styles.info}>Profile</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>
                    navigation.navigate("Laporan Absen", {
                      nama: user.nama,
                      npk: user.npk,
                      id_akun: user.id_absen,
                      wilayah: user.wilayah,
                      area_kerja: user.areaKerja,
                      jabatan: user.jabatan,
                    })
                  }>
                  <View style={[styles.menuBox, { backgroundColor: "#a6f081" }]}>
                    <Image style={styles.icon} source={require("../src/img/absensi.png")} />
                    <Text style={styles.info}>Absensi</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={informasi}>
                  <View style={[styles.menuBox, { backgroundColor: "#f09981" }]}>
                    <Image style={styles.icon} source={require("../src/img/inbox.png")} />
                    <Text style={styles.info}>Inbox</Text>
                  </View>
                </TouchableOpacity>

                

                <TouchableOpacity onPress={patrol}>
                  <View style={[styles.menuBox, { backgroundColor: "#ff6600" }]}>
                    <Image style={styles.icon} source={require("../src/img/security-guard.png")} />
                    <Text style={styles.info}>I-Patrol</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={informasi}>
                  <View style={[styles.menuBox, { backgroundColor: "#a64dff" }]}>
                    <Image style={styles.icon} source={require("../src/img/night-shift.png")} />
                    <Text style={styles.info}>Ijin</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={informasi}>
                  <View style={[styles.menuBox, { backgroundColor: "#ff80d5" }]}>
                    <Image style={styles.icon} source={require("../src/img/online-course.png")} />
                    <Text style={styles.info}>Course</Text>
                  </View>
                </TouchableOpacity>
              </View>
              </ScrollView>
              </>
        }
      </View>
      
    );
  }
