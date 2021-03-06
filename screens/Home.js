import React, { useState ,Component  , useEffect , useCallback } from 'react';
import { View, Text , TouchableOpacity , Image , Dimensions , Button , BackHandler ,  Alert , Linking , ActivityIndicator , RefreshControl , ScrollView} from 'react-native';
import styles from '../src/component/styles.js';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-paper";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

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
              console.log(hasil)
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
      if (value == null || value === '') {
        navigation.navigate("Login");
      }else if(value != null){
        console.log(value);
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
  // const patrol = async() => {
  //    const status =  await AsyncStorage.getItem('patrol');
  //    const npk    =  await AsyncStorage.getItem('token');
  //    const token_patrol    =  await AsyncStorage.getItem('token_patrol');
     
  //    if(status === 'Y'){
  //    Alert.alert('Perhatian' , 'Lanjut Patroli', [
  //     {
  //       text: "Batal",
  //       onPress: () => console.log(token_patrol),
  //       style: "cancel"
  //     },
  //     { text: "Iya", onPress: () => Linking.openURL('https://isecuritydaihatsu.com/Ipatrol/Login_?id=' + npk + '&pwd=' + token_patrol ) }
  //   ]);
  //   }else {
  //     Alert.alert('Perhatian' , 'Patrol Hanya untuk danru');
  //   }
  // }
  //


  //informasi menu masih pengembangan 
  const informasi = async() => {
    alert('Oops , sistem masih pengembangan');
  }
  

  // link menuju kamera absensi
  const goToAbsen = () => {
    if(user.jabatan === 'PIC'){
      Alert.alert('Perhatian' , 'Hanya bisa di akses Korlap dan Anggota');
    }else {
      navigation.navigate("Absensi", {
        nama: user.nama,
        npk: user.npk,
        id_akun: user.id_absen,
        wilayah: user.wilayah,
        area_kerja: user.areaKerja,
        jabatan: user.jabatan,
      })
    }
  }


  // link menuju profile
  const goToProfile = () => {
    if(user.jabatan === 'PIC'){
      Alert.alert('Perhatian' , 'Hanya bisa di akses Korlap dan Anggota');
    }else {
      navigation.navigate("Profile", {
        nama: user.nama,
        npk: user.npk,
        id_akun: user.id_absen,
        wilayah: user.wilayah,
        area_kerja: user.areaKerja,
        jabatan: user.jabatan,
      })
    }
  }


  // link menuju patroli
  const goToPatroli = async () => {
    if(user.jabatan === 'PIC'){
      Alert.alert('Perhatian' , 'Hanya bisa di akses Korlap dan Anggota');
    }else {
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
  }


  //link menuju akun setting
  const goToAccount = () => {
    if(user.jabatan === 'PIC'){
      Alert.alert('Perhatian' , 'Hanya bisa di akses Korlap dan Anggota');
    }else {
      navigation.navigate("Akun", {
        nama: user.nama,
        npk: user.npk,
        id_akun: user.id_absen,
        wilayah: user.wilayah,
        area_kerja: user.areaKerja,
        jabatan: user.jabatan,
      })
    }
  }
  

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
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="red"></ActivityIndicator>
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


              <View style={styles.headText}>
                <TouchableOpacity
                  onPress={goToAccount }
                >
                  <Text style={{ fontWeight: "bold" }}>
                    <Icon name="user-circle" backgroundColor="#3b5998" style={{ fontSize: 25, marginTop: 2 }}></Icon> <Text style={{ textDecorationLine: "underline" }}>{user.nama}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
                <TouchableOpacity
                 style={styles.header}
                  onPress={ goToAbsen }
                >
              <View>
                  <View style={styles.linkAbsen}>
                    <Image style={styles.scanIMG} source={require("../src/img/scan.png")}></Image>
                    <Text style={{ fontSize: 20, color: "#fff" }}> Absen</Text>
                  </View>
                  <View style={{
                    flex:1 ,
                    position:'absolute' ,
                    }}>
                    <Image style={{
                      width : 85 ,
                      height :85 , 
                      marginTop : -20 , 
                      marginLeft : '40%' ,
                    }} source={require("../src/img/qr.png")}></Image>

                  </View>
              </View>
                </TouchableOpacity>


              <View>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={ goToProfile }
                >
                  <View style={styles.menuBox}>
                    <Image style={styles.icon} source={require("../src/img/security-man.png")} />
                    <Text style={styles.info}>Profile</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Absen", {
                      nama: user.nama,
                      npk: user.npk,
                      id_akun: user.id_absen,
                      wilayah: user.wilayah,
                      area_kerja: user.areaKerja,
                      jabatan: user.jabatan,
                    })
                  }
                >
                  <View style={styles.menuBox}>
                    <Image style={styles.icon} source={require("../src/img/clock.png")} />
                    <Text style={styles.info}>Absensi</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={informasi}>
                  <View style={styles.menuBox}>
                    <Image style={styles.icon} source={require("../src/img/mail-box.png")} />
                    <Text style={styles.info}>Inbox</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={informasi}>
                  <View style={styles.menuBox}>
                    <Image style={styles.icon} source={require("../src/img/online-course.png")} />
                    <Text style={styles.info}>Course</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToPatroli}>
                  <View style={styles.menuBox}>
                    <Image style={styles.icon} source={require("../src/img/guard(1).png")} />
                    <Text style={styles.info}>I-Patrol</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>


              
            </ScrollView>
          </>
        )}
      </View>
    );
  }
