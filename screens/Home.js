import React, { useState ,Component  , useEffect  } from 'react';
import { View, Text , TouchableOpacity , Image , Dimensions , Button , BackHandler ,  Alert} from 'react-native';
import styles from '../src/component/styles.js';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default function  Home ({navigation,route}) {
  const [user , setUser] = useState({npk : '' , id_absen : '' , wilayah: '' , areaKerja : '' , jabatan: ''  , nama : ''})
  const [id_ , setId] = useState(null)

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {

  //ambil data diri anggota untuk akses absensi 
    const getParamsAbsensi = async () => {
      const  status = await  AsyncStorage.getItem('token');
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

   
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction)
  
  }, []);
  
  const  logout = async() => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login')
  }
  
    return (
      <View style={styles.container}>
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
              <Text style={{ fontSize: 20 }}>Scaning QR Code</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() =>
              navigation.navigate("LaporanAbsen", {
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

          <TouchableOpacity>
            <View style={[styles.menuBox, { backgroundColor: "#f09981" }]}>
              <Image style={styles.icon} source={require("../src/img/inbox.png")} />
              <Text style={styles.info}>Inbox</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <View style={[styles.menuBox, { backgroundColor: "#a481f0" }]}>
              <Image style={styles.icon} source={require("../img/absensi.png")} />
              <Text style={styles.info}>Absensi</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.menuBox, { backgroundColor: "#e781f0" }]}>
              <Image style={styles.icon} source={require("../img/absensi.png")} />
              <Text style={styles.info}>Absensi</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.menuBox, { backgroundColor: "#f081a0" }]}>
              <Image style={styles.icon} source={require("../img/absensi.png")} />
              <Text style={styles.info}>Absensi</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                nama: "dasep",
              })
            }
          >
            <View style={[styles.menuBox, { backgroundColor: "#f0db81" }]}>
              <Image style={styles.icon} source={require("../src/img/policeman.png")} />
              <Text style={styles.info}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Button title="LOGOUT" onPress={logout}></Button>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
