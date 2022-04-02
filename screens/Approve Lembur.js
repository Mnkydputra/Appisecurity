import React, { Component, useState ,useEffect } from 'react';
import { View, Text  , FlatList , StyleSheet , Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import * as Device from 'expo-device';

const  windowHeight = Dimensions.get('window').height;

export default function Approve ({navigation , route}) {
const [data , setData] = useState('');

    const daftarLembur = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/daftarLembur?wilayah=' + route.params.wilayah
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status === 'failed'){
                setData(NULL)
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setData(hasil)
            }
        })
    }


    const approve = () => {

    }

    //fungsi untuk menampilkan data absen karyawan
    const showData = () => {
        return (
        <FlatList 
            data={data}
            renderItem = {({item}) => (
                <DataTable.Row>
                    <DataTable.Cell>{item.nama}</DataTable.Cell>
                    <DataTable.Cell>{item.area}</DataTable.Cell>
                    <DataTable.Cell>{item.over_time_start}</DataTable.Cell>
                    <DataTable.Cell>{item.over_time_end}</DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity>
                            <Text>Reject</Text>
                        </TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
            )}
            keyExtractor={(item, index) => index.toString()}
            />    
        )
    }

    useEffect(() => {
        daftarLembur();
        console.log(Device.osBuildId);
    },[])


    return (
        <View style={styles.container}  >
            <View>
            <DataTable style={{height : windowHeight}}>
                <DataTable.Row>
                    <DataTable.Cell>Nama</DataTable.Cell>
                    <DataTable.Cell>Area</DataTable.Cell>
                    <DataTable.Cell>Start</DataTable.Cell>
                    <DataTable.Cell>End</DataTable.Cell>
                    <DataTable.Cell>Approve</DataTable.Cell>
                    <DataTable.Cell>Reject</DataTable.Cell>
                </DataTable.Row>
                { showData() }
            </DataTable>
            </View>
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
