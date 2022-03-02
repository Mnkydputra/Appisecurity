import React, { Component  ,useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler ,FlatList ,ScrollView } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

import { Table, TableWrapper, Row , Rows } from "react-native-table-component";


export default function ViewAbsen ({navigation,route}) {
    
    const [dataAbsen , setDataAbsen] = useState([])
    const [tableHead, setTableHead] = useState(['Tanggal', 'IN', 'OUT', 'KET']);
    const[tableData , settbl] = useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '2'],
        ['a', 'b', 'c', 'd'] 
    ])
    useEffect(() => {

    //ambil data absensi anggota
    const getDataAbsensi = async  () => {
        const  bulan  =  route.params.bulan ;
        const  npk = await  AsyncStorage.getItem('token');
          var  urlAksi = 'https://isecuritydaihatsu.com/api/ambil_absen?bulan=' + bulan + '&npk=' + route.params.npk ;
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
                }else {
                    console.log('not found item');
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
  }, []);



    return (
        <View style={styles.container}>
        <ScrollView horizontal={true}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });