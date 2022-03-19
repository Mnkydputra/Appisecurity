import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ActivityIndicator ,  Dimensions} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';

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




//fungsi untuk menampilkan data absen karyawan
const showData = () => {
    return (
       <FlatList 
          data={dataAbsen}
          renderItem = {({item}) => (
             
              <DataTable.Row style={{display:'flex'}}>
                  <DataTable.Cell>{item.time}</DataTable.Cell>
                  <DataTable.Cell>{item.in_time}</DataTable.Cell>
                  <DataTable.Cell>{item.out_time}</DataTable.Cell>
                  <DataTable.Cell>{item.ket}</DataTable.Cell>
              </DataTable.Row>
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
            <View >
                <DataTable style={{height : windowHeight}}>
                <DataTable.Row style={{marginTop:20}}>
                    <DataTable.Cell>Tanggal</DataTable.Cell>
                    <DataTable.Cell>IN</DataTable.Cell>
                    <DataTable.Cell>OUT</DataTable.Cell>
                    <DataTable.Cell>KET</DataTable.Cell>
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
        backgroundColor: '#FFF'  ,
        height : windowHeight
      },
      HeadStyle: { 
       
        backgroundColor: '#ffe0f0'
      },
      // TableText: { 
      //   margin: 10
      // }
  });