import React, { useState, useEffect  ,useCallback} from 'react';
import { Text, View, StyleSheet, Button , Dimensions , TextInput , ActivityIndicator, BackHandler , Modal , Alert , Pressable , Image ,RefreshControl , ScrollView  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';
import { DataTable } from 'react-native-paper';
const { width, height } = Dimensions.get("window");
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default function Absensi({navigation,route}) {
  const [hasPermission, setHasPermission  ] = useState(null);
  const [info ,setInfo] = useState({longBarcode : '' , latiBarcode :'',  });
  const [lokasi, setLokasi] = useState({latiUser : '' , longiUser : ''});
  const [hasil, setHasil] = useState("");
  const [hasilKorlap, setHasilKorlap] = useState(null);
  const [barcode ,setBarcode] = useState("");
  const [scanned, setScanned ] = useState(false);
  const [titleModal , setTitleModal] = useState("");
  const [icon,setIcon] = useState(null);
  const [informasi , setInformasi] = useState({gambar :'' , statusAbsensi: '' , keterangan : '' , status : '' , waktu : ''});
  const [user , setUser] = useState({npk : route.params.npk , id_absen : route.params.id_akun , wilayah: route.params.wilayah , areaKerja : route.params.area_kerja , jabatan: route.params.jabatan  , nama : route.params.nama })
  const [loading , setLoading ] = useState(false)

  const [location, setLocation] = useState(null);
  const [locationPermission , hasPermissionLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [msgBarcode , setMsgBarcode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const leftTop = { borderLeftWidth: 5, borderTopWidth: 5, borderColor: "#000" };
  const leftBottom = { borderLeftWidth: 5, borderBottomWidth: 5, borderColor: "#000" };
  const RightTop = { borderRightWidth: 5, borderTopWidth: 5, borderColor: "#000" };
  const rightBottom = { borderBottomWidth: 5, borderRightWidth: 5, borderColor: "#000" };


  const [refreshing, setRefreshing] = useState(false);


  //refresh screen home 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    async ()=> {
      //ambil posisi user 
      let { statusLokasi } = await Location.requestForegroundPermissionsAsync();
      //ijinkan mengakses lokasi user
      hasPermissionLocation(statusLokasi === 'granted');

      let position = await Location.getCurrentPositionAsync({});
      //get longitude dan latitude user
      setLokasi({latiUser : position.coords.latitude , longiUser : position.coords.longitude});
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    (async () => {
      let { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      //ambil posisi user 
      let { statusLokasi } = await Location.requestForegroundPermissionsAsync();
      //ijinkan mengakses lokasi user
      hasPermissionLocation(statusLokasi === 'granted');

      let position = await Location.getCurrentPositionAsync({});
      //get longitude dan latitude user
      setLokasi({latiUser : position.coords.latitude , longiUser : position.coords.longitude});
      // end of posisi user 
    })();

    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };
  
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
    BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    const txt = data.split("," , 2) ;
    const la = txt[0];
    const lo = txt[1];
      //jika jabatan korlap gunakan kode ini 
      if(user.jabatan === 'KORLAP'){
        var urlAksi = 'https://isecuritydaihatsu.com/api/barcodeKorlap?wilayah='+user.wilayah+'&latitude=' + la;
        fetch(urlAksi , {
          headers : {
            'keys-isecurity' : 'isecurity' ,
          }
        })
        .then((response)=> response.json())
        .then((json) => {
            console.log("response : " + json.message);
            setHasilKorlap(json.message);
                if(json.message == 1){
                  try {
                    var linkAbsen = 'https://isecuritydaihatsu.com/api/input_absen' ;
                    fetch(linkAbsen,{
                        method : 'POST'  ,
                        headers : {
                          'Content-Type' : 'application/x-www-form-urlencoded'  ,
                          'keys-isecurity' : 'isecurity' ,
                        } ,
                        body : "npk=" + user.npk +"&area_kerja=" + user.areaKerja +"&wilayah=" + user.wilayah +"&id_absen=" + user.id_absen  
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        // alert(json.message);
                        // setLoading(false);

                        setLoading(false);
                        setModalVisible(true);
                        setTitleModal("INFORMASI");
                        setInformasi({ keterangan : json.message , status : json.status , waktu : json.time  , info : json.info  , gambar : json.status});
                        setIcon('true');
                    })
                  }catch(error){
                    alert(alert.message)
                  }  
                }else {
                  Alert.alert( "Perhatian" ,"absen antar wilayah di tolak" , [{
                    text : 'YA' ,
                    onPress : () => null  
                  }]);
                  setLoading(false);
                }
        })
        .catch((error)=> {
            console.log(error)
        }) 
      }else {
        var barcodeAgt = 'https://isecuritydaihatsu.com/api/barcodeAnggota?area_kerja='+user.areaKerja+'&latitude=' + la;
        fetch(barcodeAgt, {
          headers : {
            'keys-isecurity' : 'isecurity' ,
          }
        })
        .then((response)=> response.json())
        .then((json) => {
            // alert(json.message)
                if(json.message == 1){
                        // hitung jarak antar user dan titik barcode      
                      var distance = getPreciseDistance(
                        { latitude: la, longitude: lo }, //lokasi barcode
                        { latitude: lokasi.latiUser, longitude: lokasi.longiUser } // lokasi user
                      );
                      console.log(`Jarak ${distance} Meter`);
                      const jarak =  distance ;
                      if(jarak > 200){
                        Alert.alert("Perhatian" ,"jarak dengan  " + user.areaKerja + " sejauh " + jarak + " meter" , [
                          {
                            text : 'OK' ,
                            onPress : () => setLoading(false)
                          }
                        ]);
                        // setLoading(false);
                        // navigation.navigate('Home')
                      }else {
                        try {
                          var urlAksi = 'https://isecuritydaihatsu.com/api/input_absen' ;
                          fetch(urlAksi,{
                              method : 'POST'  ,
                              headers : {
                                'Content-Type' : 'application/x-www-form-urlencoded'  ,
                                'keys-isecurity' : 'isecurity' ,
                              } ,
                              body : "npk=" + user.npk +"&area_kerja=" + user.areaKerja +"&wilayah=" + user.wilayah +"&id_absen=" + user.id_absen  
                          })
                          .then((response) => response.json() )
                          .then((json) => {
                              //alert(json.message);
                              // navigation.navigate('Home')
                              setLoading(false);
                              setModalVisible(true);
                              setTitleModal("INFORMASI");
                              setInformasi({ keterangan : json.message , status : json.status , waktu : json.time  , info : json.info  , gambar : json.status});
                              setIcon('true');
                              // console.log(json.status)
                          })
                        }catch(error){
                          alert(error.message)
                        }
                        
                      }
                }else {
                  // alert("barcode tidak sesuai area kerja");
                  setLoading(false);
                  setModalVisible(true);
                  setMsgBarcode(true);
                  setInformasi({keterangan : "Bercode tidak sesuai area kerja" , status : 'fail' });
                  // console.log(json);
                }
        })
        .catch((error)=> {
            alert(error)
        })
      }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Mencari Kamera Utama</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
     <View style={styles.container}>
         <Text>No access to camera</Text>
    </View>
  )
  }

  let posisiUser = 'Waiting..';
  if (errorMsg) {
    posisiUser = errorMsg;
  } else if (lokasi) {
    posisiUser = JSON.stringify(lokasi);
  }
    let image = require('../src/img/cancel.png') ;
    if(informasi.gambar === 'fail'){
     image =  require('../src/img/cancel.png') ;
    }else {
     image =  require('../src/img/success.png') ;
    }
    console.log(informasi.gambar);

  return (
    <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
      {msgBarcode ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>Perhatian</Text>

              <Image source={require("../src/img/warning.png")} style={{ width: 80, height: 80, marginBottom: 12 }}></Image>
              <DataTable style={{ fontSize: 8 }}>
                <DataTable.Row>
                  <DataTable.Cell style={{ width: 40 }}>Nama</DataTable.Cell>
                  <DataTable.Cell>{user.nama} </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>NPK</DataTable.Cell>
                  <DataTable.Cell>{user.npk}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Status</DataTable.Cell>
                  <DataTable.Cell>GAGAL</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Ket</DataTable.Cell>
                  <DataTable.Cell>Barcode Invalid</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Tutup</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText2}>{titleModal}</Text>

              <Image source={image} style={{ width: 100, height: 100, marginBottom: 12 }}></Image>
              <View style={{ flex: 1 }}>
                <Text>Nama : {user.nama} </Text>
                <Text>NPK : {user.npk} </Text>
                <Text>Status : {informasi.info} </Text>
                <Text>Waktu : {informasi.waktu}</Text>
                <Text>Keterangan : {informasi.keterangan} </Text>
              </View>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Tutup</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          />
        }
      >
        
        <View style={styles.barcodebox}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, styles.container]}>
            <View style={{ width: width / 2, height: width / 2}}>
              <View style={{ flex: 1, flexDirection: "row",  }}>
                <View style={{ flex: 1, ...leftTop }} />
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, ...RightTop }} />
              </View>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, flexDirection: "row", }}>
                <View style={{ flex: 1, ...leftBottom }} />
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1,  ...rightBottom }} />
              </View>
            </View>
            
          </BarCodeScanner>
        </View>
        {scanned && <Button style={{ color: "tomato" }} title={"ULANGI SCAN"} onPress={() => setScanned(false)} />}
        <View>
          <ActivityIndicator animating={loading} color="red" size="large"></ActivityIndicator>
        </View>

        <DataTable>
          {user.jabatan == "KORLAP" ? null : (
            <DataTable.Row>
              <DataTable.Cell>Area Kerja</DataTable.Cell>
              <DataTable.Cell>{user.areaKerja}</DataTable.Cell>
            </DataTable.Row>
          )}
          <DataTable.Row>
            {/* <DataTable.Cell>Titik Koordinat</DataTable.Cell>
            <DataTable.Cell>{lokasi.latiUser + "," + lokasi.longiUser}</DataTable.Cell> */}
            <DataTable.Cell>Wilayah</DataTable.Cell>
            <DataTable.Cell>{route.params.wilayah}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // width: "100%", // 80% of screen's width
    // height: "100%", // 20% of screen's height
    // justifyContent: "center",
    // margin: windowWidth / 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#50C4DE",
    padding: 5,
  },
  textInput: {
    backgroundColor: "red",
    color: "#fff",
    borderRadius: 3,
    marginBottom: 4,
    height: 40,
    width: 400,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "10%",
    textAlign: "center",
    width: "70%",
    color: "white",
  },
  barcodebox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 560,
    overflow: "hidden",
    marginBottom: 5,
    // borderRadius : 30 ,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 40,
    height: 450,
    width: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginTop: 12,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalText2: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
});