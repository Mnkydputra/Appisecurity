import React, { Component , useState , useEffect, useCallback } from 'react';
import { View, Text , StyleSheet , TouchableOpacity ,FlatList , Alert, Dimensions , Image  ,RefreshControl , ScrollView , ActivityIndicator,BackHandler } from 'react-native';
import Button from 'react-native-flat-button'
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default function ApproveSKTA({navigation,route}) {
    const [data , setData] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading,setLoading] = useState(true)
    //refresh screen home 
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        daftarSKTA();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //fungsi loading 
    const showLoad = () => {
        setTimeout(() => {
          setLoading(false);
        },3000)
    }
    showLoad();

    const daftarSKTA = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/daftarSKTA?wilayah='+route.params.wilayah+'&jabatan=' + route.params.jabatan
        // var urlAksi = 'http://192.168.8.170/isecurity_ea/api/daftarSKTA?wilayah=wil2&jabatan=PIC'
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
                console.log(hasil)
                setData(hasil)
            }
        })
    }


    //reject lemburan
    const reject = (id) => {
        Alert.alert("Perhatian",  'Tolak SKTA', [
            { text: "TIDAK", onPress: () => null },
            {text : 'YA' , onPress : () => 
               fetch('https://isecuritydaihatsu.com/api/ApproveSKTA',{
                           headers : {
                               'keys-isecurity' : 'isecurity' ,
                               'Content-Type': 'application/json' , 
                           } ,
                           method : 'PUT' , 
                           body : JSON.stringify({
                               "id" : id,
                               "status_approve" : '0' ,
                               "id_absen"  : "AGT-228572"
                           })
                   })
                   .then((response) => response.json())
                   .then((json) => {
                       if(json.status === 'fail'){
                           Alert.alert("INFORMASI", json.result, [
                               { text: "YA", onPress: () => daftarSKTA() },
                           ]);
                       }else {
                           Alert.alert("Berhasil!", json.result, [
                               { text: "YA", onPress: () => daftarSKTA() },
                           ]);
                       }
                       daftarSKTA();
                   })
               }
       ])
    }

    //approve skta
    const approve = (id) => {
        Alert.alert("Perhatian",  'Approve SKTA', [
            {text : 'BATAL' , onPress : () => null
            } ,
            {text : 'YA' , onPress : () => fetch('https://isecuritydaihatsu.com/api/ApproveSKTA',{
                    headers : {
                        'keys-isecurity' : 'isecurity' ,
                        'Content-Type': 'application/json' , 
                    } ,
                    method : 'PUT' , 
                    body : JSON.stringify({
                        "id" : id,
                        "status_approve" : '1' ,
                        "id_absen"  : "AGT-228572"
                    })
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                if(json.status === 'fail'){
                    Alert.alert("GAGAL", json.result, [
                        { text: "YA", onPress: () => daftarSKTA() },
                    ]);
                }else {
                    Alert.alert("Berhasil!", json.result, [
                        { text: "YA", onPress: () => daftarSKTA() },
                    ]);
                }
                daftarSKTA();
            })}
        ])
    }

    const showData = () => {

        if(data === '' || data == null){
            return(
               <Image style={styles.img} source={ require('../src/img/notfound.png')}></Image>
            )
        }else {

           return data.map((item)=> {
                return (
                    <View key={item.id.toString()} >
                    <Card style={styles.cardKonten}>
                            <Card.Content>
                            <Paragraph style={styles.colorText} >{item.nama} - {item.npk}</Paragraph>
                            <View>
                                <Text style={styles.colorText}>Tanggal  : {item.date_in}</Text>
                                <Text style={styles.colorText}>Jam Masuk : {item.in_time}</Text>
                                <Text style={styles.colorText}>Jam Pulang : {item.out_time}</Text>
                                <Text style={styles.colorText}>Keterangan  : {item.keterangan}</Text>
                            </View>
                            <View style={{ 
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}>
                               <TouchableOpacity>
                                <Button
                                    type="negative"
                                    onPress={() => reject(item.id)}
                                    containerStyle={styles.buttonContainer}
                                    contentStyle={styles.content}
                                >
                                     <Icon style={{fontWeight:'normal'}} name="close" ></Icon> Reject
                                </Button>
                                </TouchableOpacity>
    
                                <TouchableOpacity>
                                <Button
                                type="positive"
                                onPress={() => approve(item.id)}
                                containerStyle={styles.buttonContainer}
                                contentStyle={styles.content}
                                >
                                   <Icon style={{fontWeight:'normal'}} name="check" ></Icon> Approve SKTA
                                </Button>
                                </TouchableOpacity>
                            </View>
                            </Card.Content>
                        </Card>
                    </View>

                )
            })
        }     
    }

        useEffect(() => {
            daftarSKTA();
        },[])

    return (
        <>
        {
            loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
            <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                        {showData()}
                </View>
            </ScrollView> 
        }
        </>
    );
  }

  const styles = StyleSheet.create({
        container : {
            flex: 1,
            alignContent:'center' ,
            alignItems:'center' ,
            backgroundColor:"#50C4DE"
        } ,
        buttonContainer: {
            width: 150,
            height: 30,
            fontSize : 3 ,
            margin:3 ,
            borderRadius : 3 
          },
          cardKonten : {
            backgroundColor:'#254079', 
            borderRadius:12 ,
            marginTop:3 ,
            width : windowWidth - 10
          },
          content : {
            fontSize:13,
            fontWeight: 'normal' ,
            color : '#fff'
          } ,
          colorText : {
              color :'#fff'
          },img: {
            alignItems:'center',
            margin:200,
            width:250,
            height:250,
          },

  });