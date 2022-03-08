import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ScrollView , Image ,ActivityIndicator , Modal , Button} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];
export default function ViewAbsen ({navigation,route}) {
    
    const [dataAbsen , setDataAbsen] = useState('');
    const [loading,setLoading] = useState(true)
    const [tableHead, setTableHead] = useState(['Tanggal', 'IN', 'OUT', 'KET']);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [align, setAlign] = useState('center');
    const [alignsecond, setAlignsecond] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    const  bulan  =  route.params.bulan ;
    var  url      = 'https://isecuritydaihatsu.com/api/ambil_absen?bulan=' + bulan + '&npk=' + route.params.npk + '&wilayah=' + route.params.wilayah  ;
    

    let unmounted = false
    //ambil data absensi anggota
    const getDataAbsensi = async  () => {
      const  npk    = await  AsyncStorage.getItem('token');
          fetch(url,{
              headers : {
                  'keys-isecurity' : 'isecurity' ,
              } ,
              signal : controller.signal 
          })
          .then((response) => response.json())
          .then((json) => {

            if(!unmounted)
              if(json.status === 'success'){
                  // console.log(json.result);
                  setDataAbsen(json.result)
                  // console.log(dataAbsen);
              }else {
                  setDataAbsen(json.status);
                  console.log(json.status);
              }
          })
    }
    getDataAbsensi();
    // end of ambil data absensi

    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };
  
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
    BackHandler.removeEventListener('hardwareBackPress', handleBackPress);

  }, [itemsPerPage ]);




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
  if(dataAbsen == 'failed'){
    return (
      <DataTable.Row>
        <DataTable.Cell>Data Tidak Ditemukan</DataTable.Cell>
      </DataTable.Row>
    )
  }else {
    return (
       <FlatList 
          data={dataAbsen}
          renderItem = {({item}) => (
              <DataTable.Row>
                  <DataTable.Cell>{item.in_date}</DataTable.Cell>
                  <DataTable.Cell>{item.in_time}</DataTable.Cell>
                  <DataTable.Cell>{item.out_time}</DataTable.Cell>
                  <DataTable.Cell>{item.ket}</DataTable.Cell>
              </DataTable.Row>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> 
    )
  }
}



    return (

      <View style={{flex : 1}}>
          {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <View>
                <DataTable>
                  <DataTable.Header>
                      <DataTable.Title>Tanggal</DataTable.Title>
                      <DataTable.Title>IN</DataTable.Title>
                      <DataTable.Title>OUT</DataTable.Title>
                      <DataTable.Title>KET</DataTable.Title>
                  </DataTable.Header>
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
        padding: 18,
        backgroundColor: '#ffffff' 
      },
      HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
      },
      TableText: { 
        margin: 10
      }
  });