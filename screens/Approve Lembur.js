import React, { Component, useState ,useEffect } from 'react';
import { View, Text  , FlatList , StyleSheet , Dimensions , Alert} from 'react-native';
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
                setData('')
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setData(hasil)
            }
        })
    }


    const approve = async (id) => {
       
    }

    const reject = async (id) => {
       console.log(id)
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
                        <TouchableOpacity onPress={ () => 
                        Alert.alert("INFORMASI",  'Approve Lemburan', [
                            {text : 'BATAL' , onPress : () => null
                            } ,
                            {text : 'YA' , onPress : () => fetch('https://isecuritydaihatsu.com/api/ApproveLembur',{
                                    headers : {
                                        'keys-isecurity' : 'isecurity' ,
                                        'Content-Type': 'application/json' , 
                                    } ,
                                    method : 'PUT' , 
                                    body : JSON.stringify({
                                        "id" : item.id,
                                        "status_approve" : '1'
                                    })
                                })
                                .then((response) => response.json())
                                .then((json) => {
                                if(json.status === 'fail'){
                                    Alert.alert("GAGAL", json.result, [
                                        { text: "YA", onPress: () => daftarLembur },
                                    ]);
                                }else {
                                    Alert.alert("Berhasil!", json.result, [
                                        { text: "YA", onPress: () => daftarLembur },
                                    ]);
                                }
                            })}
                        ])
                            
                        }>
                            <Text style={{color:'cyan' , backgroundColor:'black' , borderRadius:4 }} >Accept</Text>
                        </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity  onPress={() => 
                        Alert.alert("INFORMASI",  'Tolak Lemburan', [
                             { text: "TIDAK", onPress: () => null },
                             {text : 'YA' , onPress : () => 
                                fetch('https://isecuritydaihatsu.com/api/ApproveLembur',{
                                            headers : {
                                                'keys-isecurity' : 'isecurity' ,
                                                'Content-Type': 'application/json' , 
                                            } ,
                                            method : 'PUT' , 
                                            body : JSON.stringify({
                                                "id" : item.id,
                                                "status_approve" : '0'
                                            })
                                    })
                                    .then((response) => response.json())
                                    .then((json) => {
                                        if(json.status === 'fail'){
                                            Alert.alert("INFORMASI", json.result, [
                                                { text: "YA", onPress: () => daftarLembur() },
                                            ]);
                                        }else {
                                            Alert.alert("Berhasil!", json.result, [
                                                { text: "YA", onPress: () => daftarLembur() },
                                            ]);
                                        }
                                    })
                                }
                        ])
                        } >
                            <Text style={{color:'#fff' ,backgroundColor:'black' , borderRadius:4}}>Reject</Text>
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
        // console.log(Device.osBuildId);
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
