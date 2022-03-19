import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ScrollView , Image ,ActivityIndicator , Modal , Button , ScroolView} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];
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
                console.log(json.result);
                setDataAbsen(json.result)
                // console.log(dataAbsen);
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
    const numberOfItemsPerPageList = [2, 3, 4];
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, dataAbsen.length);
    // 
    useEffect(() => {
    
        getDataAbsensi();
        // end of ambil data absensi

        setPage(0);
        const handleBackPress = () => {
          navigation.goBack();
          return true;
    };
  
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
    BackHandler.removeEventListener('hardwareBackPress', handleBackPress);

  }, [numberOfItemsPerPage]);




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
}



    return (

      <View style={{flex : 1}}>
          {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <View style={styles.container} >
                <DataTable>
                  <DataTable.Header>
                      <DataTable.Title>Tanggal</DataTable.Title>
                      <DataTable.Title>IN</DataTable.Title>
                      <DataTable.Title>OUT</DataTable.Title>
                      <DataTable.Title>KET</DataTable.Title>
                  </DataTable.Header>
                    { showData()  }
                 
                    <DataTable.Pagination
                      page={31} >
                    </DataTable.Pagination>
              </DataTable>
            </View>
          }
         
      </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 3,
        backgroundColor: '#ffffff' 
      },
      HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
      },
      // TableText: { 
      //   margin: 10
      // }
  });