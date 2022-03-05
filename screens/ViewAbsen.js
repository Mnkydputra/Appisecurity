import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ScrollView , Image ,ActivityIndicator} from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];
export default function ViewAbsen ({navigation,route}) {
    
    const [dataAbsen , setDataAbsen] = useState('');
    const [load,setLoading] = useState(true)
    const [tableHead, setTableHead] = useState(['Tanggal', 'IN', 'OUT', 'KET']);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [align, setAlign] = useState('center');
    const [alignsecond, setAlignsecond] = useState(false);
  
    setTimeout(() => {
      setAlign('flex-start'), setAlignsecond(true);
    }, 3000);


    useEffect(() => {

    //ambil data absensi anggota
    const getDataAbsensi = async  () => {
        const  bulan  =  route.params.bulan ;
        const  npk = await  AsyncStorage.getItem('token');
          var  urlAksi = 'https://isecuritydaihatsu.com/api/ambil_absen?bulan=' + bulan + '&npk=' + route.params.npk + '&wilayah=' + route.params.wilayah  ;
            fetch(urlAksi,{
                headers : {
                    'keys-isecurity' : 'isecurity' ,
                } ,
            })
            .then((response) => response.json())
            .then((json) => {
                if(json.status === 'success'){
                    // console.log(json.result);
                    setDataAbsen(json.result)
                    // setDataAbsen(JSON.stringify(json.result))
                }else {
                    setDataAbsen(json.status);
                }
            })
      }
      getDataAbsensi();
      // end of ambil data diri 

        const handleBackPress = () => {
          navigation.goBack();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        setPage(0);
  }, [itemsPerPage]);

//   console.log(dataAbsen);
// data={tableData}
// data={dataAbsen}
//borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}
    return (
       
        
    <View style={{flex : 1  ,marginTop:50}}>
    <View>
       <ActivityIndicator
                animating={true}
                color ='red' 
                size = 'large'
            ></ActivityIndicator>
    </View>
      {!alignsecond ? null : (
         
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Tanggal</DataTable.Title>
                <DataTable.Title>IN</DataTable.Title>
                <DataTable.Title>OUT</DataTable.Title>
                <DataTable.Title>KET</DataTable.Title>
            </DataTable.Header>
           
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
            </DataTable>
      )}
      
            
            {/* <DataTable.Pagination
                        page={page}
                        numberOfPages={3}
                        onPageChange={(page) => setPage(page)}
                        label="1-2 of 6"
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                    /> */}
            
    </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 18,
        paddingTop: 35,
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