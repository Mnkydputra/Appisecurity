import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button , Dimensions , TextInput , ActivityIndicator} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';;

export default function Absensi({navigation,route}) {
  
  const [hasPermission, setHasPermission  ] = useState(null);
  const [info ,setInfo] = useState({longBarcode : '' , latiBarcode :'',  });
  const [lokasi, setLokasi] = useState({latiUser : '' , longiUser : ''});
  const [hasil, setHasil] = useState("");
  const [hasilKorlap, setHasilKorlap] = useState(null);
  const [barcode ,setBarcode] = useState("");
  const [scanned, setScanned ] = useState(false);
  const [user , setUser] = useState({npk : route.params.npk , id_absen : route.params.id_akun , wilayah: route.params.wilayah , areaKerja : route.params.area_kerja , jabatan: route.params.jabatan  })
  const [loading , setLoading ] = useState(false)

  const [location, setLocation] = useState(null);
  const [locationPermission , hasPermissionLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
                            alert(json.message);
                            setLoading(false);
                        })
                }else {
                  alert("absen antar wilayah di tolak");
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
           
                if(json.message == 1){
                        // hitung jarak antar user dan titik barcode      
                      var distance = getPreciseDistance(
                        { latitude: la, longitude: lo }, //lokasi barcode
                        { latitude: lokasi.latiUser, longitude: lokasi.longiUser } // lokasi user
                      );
                      console.log(`Jarak ${distance} Meter`);
                      const jarak =  distance ;
                      if(jarak > 2000){
                        alert("jarak dengan  " + user.areaKerja + " sejauh " + jarak + " meter");
                        setLoading(false);
                        navigation.navigate('Home')
                      }else {
                        var urlAksi = 'https://isecuritydaihatsu.com/api/input_absen' ;
                        fetch(urlAksi,{
                            method : 'POST'  ,
                            headers : {
                              'Content-Type' : 'application/x-www-form-urlencoded'  ,
                              'keys-isecurity' : 'isecurity' ,
                            } ,
                            body : "npk=" + user.npk +"&area_kerja=" + user.areaKerja +"&wilayah=" + user.wilayah +"&id_absen=" + user.id_absen  
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            alert(json.message);
                            setLoading(false);
                            navigation.navigate('Home')
                        })
                      }
                }else {
                  alert("barcode tidak sesuai area kerja");
                  console.log("barcode error")
                  setLoading(false);
                  navigation.navigate('Home')
                }
        })
        .catch((error)=> {
            console.log(error)
        })
      }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  let posisiUser = 'Waiting..';
  if (errorMsg) {
    posisiUser = errorMsg;
  } else if (lokasi) {
    posisiUser = JSON.stringify(lokasi);
  }

  

  
// useState({npk : '' , id_absen : '' , wilayah: '' , areaKerja : '' , jabatan:'ANGGOTA'  })
  return (
    
    <View style={styles.container} >
      <Text style={styles.info} >Absen Security Guard ADM</Text>
      <View>
      <ActivityIndicator
                animating={loading}
                color ='red' 
                size = 'large'
            ></ActivityIndicator>
      </View>
      <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height : 850 , width : 800}} 
      />
      </View>
      {scanned && <Button style={{color:'tomato'}} title={'SCAN BARCODE'} onPress={() => setScanned(false)} />}

      <View>
        <Text>{ "titik user :  " + lokasi.latiUser + "," + lokasi.longiUser }</Text>
        <Text>{"npk : " + user.npk }</Text>
        <Text>{"area kerja : " + user.areaKerja }</Text>
        <Text>{"wilayah : " + user.wilayah }</Text>
        <Text>{"jabatan : " + user.jabatan }</Text>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput : {
    backgroundColor : '#AdA3AA' ,
    color : '#fff' ,
    borderRadius:3 ,
    marginBottom : 4 ,
    height : 40 ,
    width : 400
} ,
  barcodebox : {
    backgroundColor : '#fff' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
    width : 420 ,
    height : 400 ,
    overflow : 'hidden' 
    // borderRadius : 30 ,
  }
})