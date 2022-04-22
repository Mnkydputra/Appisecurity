import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ActivityIndicator ,  Dimensions} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';
const { width, height } = Dimensions.get("window");

const  windowHeight = Dimensions.get('window').height;
export default function ViewAbsen ({navigation,route}) {
    
    const [dataAbsen , setDataAbsen] = useState('');
    const [loading,setLoading] = useState(true)

    // 
    let controller = new AbortController();
    const  bulan  =  route.params.bulan ;
    var  url      = 'https://isecuritydaihatsu.com/api/ambil_absen?bulan=' + bulan + '&npk=' + route.params.npk + '&wilayah=' + route.params.wilayah  ;
    //ambil data absensi anggota
    const getDataAbsensi = async  () => {
      const  npk    = await  AsyncStorage.getItem('token');
      try {
        fetch(url,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
            signal : controller.signal 
        })
        .then((response) => response.json())
        .then((json) => {

          // if(!unmounted)
            if(json.status === 'success'){
                // console.log(json.result);
                setDataAbsen(json.result)
            }else {
                setDataAbsen(json.status);
                console.log(json.status);
            }
        })
      }catch(error){
        alert(error.message)
      }
    }
    // end` 

    // 
    useEffect(() => {
    
        getDataAbsensi();
        // end of ambil data absensi
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

const  cekIN = (ket,jamMasuk) =>{
    if(ket === 'CUTI'){
      <Text> - </Text>
    }else {
        <Text>{jamMasuk}</Text>
    }
}


//fungsi untuk menampilkan data absen karyawan
const showData = () => {
    return (
       <FlatList 
          data={dataAbsen}
          renderItem = {({item}) => (
             <View >
              <DataTable.Row  style={styles.row}>
                  <DataTable.Cell >{item.time}</DataTable.Cell>
                  <DataTable.Cell >
                  {
                    item.ket === 'CUTI' ? '-'  : item.in_time
                  }
                  </DataTable.Cell>
                  <DataTable.Cell >{
                    item.ket === 'CUTI' ? '-'  : item.ourt_time
                  }</DataTable.Cell>
                  <DataTable.Cell >{item.ket}</DataTable.Cell>
              </DataTable.Row>
              </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />    
    )
}



    return (

      <View style={styles.container}  >
          {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator style={{flex:1 , justifyContent:'center' , alignItems : 'center' , alignContent : 'center'}} size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <View style={styles.container2} >
                <DataTable style={{height : windowHeight}}>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell >TANGGAL</DataTable.Cell>
                    <DataTable.Cell >IN</DataTable.Cell>
                    <DataTable.Cell >OUT</DataTable.Cell>
                    <DataTable.Cell >KET</DataTable.Cell>
                  </DataTable.Row>
                    { showData()  }
              </DataTable>
            </View>
          }
         
      </View>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
     
      backgroundColor: "#50C4DE",
      },
      row:{
        flex: 1, 
        margin:5,
        padding: 10,
        backgroundColor: "#ffff",
        borderRadius:15,
      },
      container2: { 
        backgroundColor: "#50C4DE",
      
        },
      header:{
        flex:1,
        backgroundColor: "#Fff",
        width: width * 0.90, // 80% of screen's width
        height: height * 0.05, // 20% of screen's height
        borderRadius: 10,
        margin: 10,
        alignItems:'center',
        
      },
      table: {
        backgroundColor: "#Fff",
        width: width * 0.05, // 80% of screen's width
        height: height * 0.05, // 20% of screen's height
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        padding: 10,
        
      },
  });