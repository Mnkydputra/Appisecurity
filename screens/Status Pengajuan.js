import React, { Component , useState , useEffect,useCallback } from 'react';
import { View, Text , StyleSheet , TouchableOpacity ,FlatList , Alert, Dimensions , Image,RefreshControl , ScrollView , ActivityIndicator , SafeAreaView } from 'react-native';
import Button from 'react-native-flat-button'
import { Card, Title, Paragraph , Badge  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;

export default function StatusPengajuan({navigation, route}) {
    const [data , setData] = useState('');
    const [skta , setDataSKTA] = useState('');
    const [cuti , setDataCuti] = useState('');
    const [sakit , setDataSakit] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading,setLoading] = useState(true)
    //refresh screen home 
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        daftarLembur();
        daftarSKTA();
        daftarCuti();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //fungsi loading 
    const showLoad = () => {
        setTimeout(() => {
          setLoading(false);
        },3000)
    }
    showLoad();

    const daftarLembur = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/statusLembur?npk=' + route.params.npk
        // var urlAksi = 'https://isecuritydaihatsu.com/api/statusLembur?npk=228572'
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(route.params.npk)
            if(json.status === 'failed'){
                setData('')
                // console.log(json.status)
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setData(hasil)
            }
        })
    }

    const daftarCuti = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/statusCuti?npk=' + route.params.npk
        // var urlAksi = 'https://isecuritydaihatsu.com/api/statusCuti?npk=228572'
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(route.params.npk)
            if(json.status === 'failed'){
                setDataCuti('')
                // console.log(json.status)
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setDataCuti(hasil)
            }
        })
    }


    const daftarSKTA = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/statusSKTA?npk=' + route.params.npk
        // var urlAksi = 'https://isecuritydaihatsu.com/api/statusLembur?npk=228572'
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status === 'failed'){
                setDataSKTA('')
                // console.log(json.status)
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setDataSKTA(hasil)
            }
        })
    }


    const daftarSakit = () => {
        var urlAksi = 'https://isecuritydaihatsu.com/api/StatusSakit?npk=' + route.params.npk
        // var urlAksi = 'https://isecuritydaihatsu.com/api/StatusSakit?npk=228572'
        fetch(urlAksi,{
            headers : {
                'keys-isecurity' : 'isecurity' ,
            } ,
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status === 'failed'){
                setDataSakit('')
                // console.log(json.status)
            }else {
                const hasil =  json.result ;
                // console.log(hasil)
                setDataSakit(hasil)
            }
        })
    }

   function renderOT(param) {
        switch(param) {
          case '1':
            return (
                <>
                    <Badge style={[styles.infoBTN , {backgroundColor: '#6BCB77',color:'#fff'}]}>Overtime Diterima</Badge> 
                </>
            )
            case '2':
            return (
                <>
                    <Badge style={[styles.infoBTN, {color:'#fff'}]}>Overtime Ditolak</Badge> 
                </>
            )
          default:
            return (
                <>
                    <Badge style={[styles.infoBTN,{backgroundColor: '#4D96FF' , color:'#fff'}]}>Menunggu Approval</Badge> 
                </>
            )
        }
    }

      function renderSKTA(param) {
        switch(param) {
          case '1':
            return (
                <>
                    <Badge style={[styles.infoBTN , {backgroundColor: '#6BCB77',color:'#fff'}]}>SKTA Diterima</Badge> 
                </>
            )
            case '2':
            return (
                <>
                    <Badge style={[styles.infoBTN, {color:'#fff'}]}>SKTA Ditolak</Badge> 
                </>
            )
          default:
            return (
                <>
                    <Badge style={[styles.infoBTN,{backgroundColor: '#4D96FF' , color:'#fff'}]}>Menunggu Approval</Badge> 
                </>
            )
        }
      }


      function renderCuti(param) {
        switch(param) {
          case '1':
            return (
                <>
                    <Badge style={[styles.infoBTN , {backgroundColor: '#6BCB77',color:'#fff'}]}>Cuti Diterima</Badge> 
                </>
            )
            case '2':
            return (
                <>
                    <Badge style={[styles.infoBTN, {color:'#fff'}]}>Cuti Ditolak</Badge> 
                </>
            )
          default:
            return (
                <>
                    <Badge style={[styles.infoBTN,{backgroundColor: '#4D96FF' , color:'#fff'}]}>Menunggu Approval</Badge> 
                </>
            )
        }
    }

    function renderSakit(param) {
        switch(param) {
          case '1':
            return (
                <>
                    <Badge style={[styles.infoBTN , {backgroundColor: '#6BCB77',color:'#fff'}]}>Ijin Diterima</Badge> 
                </>
            )
            case '2':
            return (
                <>
                    <Badge style={[styles.infoBTN, {color:'#fff'}]}>Ijin Ditolak</Badge> 
                </>
            )
          default:
            return (
                <>
                    <Badge style={[styles.infoBTN,{backgroundColor: '#4D96FF' , color:'#fff'}]}>Menunggu Approval</Badge> 
                </>
            )
        }
    }

    const showDataOT = () => {
        if(data === '' || data == null){
            return(
               <Text></Text>
            )
        }else {
            return data.map((item)=> {
                return (
                    <View key={item.id} >
                        <Card style={styles.cardStyle} >
                            <Card.Content>
                            <Title style={{fontSize:12}}>Pengajuan Overtime</Title>
                            <View style={styles.layout}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.textT}>{item.alasan_lembur} </Text>
                                <Text style={styles.textT}>{item.date_lembur} {item.over_time_start}-{item.over_time_end}</Text>
                            </View>
                            <View>
                            {
                                renderOT(item.status_lembur) 
                            }
                            </View>
                            </View>
                            </Card.Content>
                        </Card>
                    </View>
                )
            })
        }     
    }

    const showDataSKTA = () => {
        if(skta === '' || skta == null){
            return(
                <Text></Text>
            )
        }else {
            return skta.map((item)=> {
                return (
                    <View key={item.id} >
                        <Card style={styles.cardStyle} >
                            <Card.Content>
                            <Title style={{fontSize:12}}>Pengajuan SKTA</Title>
                            <View style={styles.layout}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.textT}>{item.date_in} </Text>
                                <Text style={styles.textT}>{item.in_time}-{item.out_time}</Text>
                            </View>
                            <View>
                            {
                                renderSKTA(item.status) 
                            }
                            </View>
                            </View>
                            </Card.Content>
                        </Card>
                    </View>
                )
            })
        }     
    }


    const showDataCuti = () => {
        if(cuti === '' || cuti == null){
            return(
                <Text></Text>
            )
        }else {
            return cuti.map((item)=> {
                return (
                    <View key={item.id} >
                        <Card style={styles.cardStyle} >
                            <Card.Content>
                            <Title style={{fontSize:12}}>Pengajuan Cuti</Title>
                            <View style={styles.layout}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.textT}>{item.alasan_cuti} </Text>
                                <Text style={styles.textT}>{item.tanggal_cuti} </Text>
                            </View>
                            <View>
                            {
                                renderCuti(item.status) 
                            }
                            </View>
                            </View>
                            </Card.Content>
                        </Card>
                    </View>
                )
            })
        }     
    }

    const showDataSakit= () => {
        if(sakit === '' || sakit == null){
            return(
                <Text></Text>
            )
        }else {
            return sakit.map((item)=> {
                return (
                    <View key={item.id} >
                        <Card style={styles.cardStyle} >
                            <Card.Content>
                            <Title style={{fontSize:12}}>Perijinan ( Sakit )</Title>
                            <View style={styles.layout}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.textT}>{item.keterangan} </Text>
                                <Text style={styles.textT}>{item.date_perijinan} </Text>
                            </View>
                            <View>
                            {
                                renderSakit(item.status) 
                            }
                            </View>
                            </View>
                            </Card.Content>
                        </Card>
                    </View>
                )
            })
        }     
    }



        useEffect(() => {
            daftarLembur();
            daftarSKTA();
            daftarCuti();
            daftarSakit();
            // console.log(route.params.npk)
        },[])

    return (
        <View style={styles.container}>
        {
          loading ? 
            <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
            :
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {showDataOT()}
                        {showDataSKTA()}   
                        {showDataCuti()}
                        {showDataSakit()}
            </ScrollView> 
            </SafeAreaView>   
        }
        </View>
    );
  }

  const styles = StyleSheet.create({
    container : {
        flex: 1,
        width:"100%",
        backgroundColor:"#50C4DE"
    } ,
    buttonContainer: {
        width: 150,
        height: 30,
        fontSize : 3 ,
        margin:3 ,
        borderRadius : 3 
      },
      cardStyle : {
        borderStartColor:'blue', 
        borderStartWidth: 3 ,
        marginTop:5 , 
        margin:5 
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
      } ,
      textT : {
          color:'#000',
          fontSize:10
       } ,
       layout : {
            flexDirection: "row",
            flexWrap: "wrap"
       } ,
       infoBTN : {
           fontSize:14,
           height:30,
           width:'100%'
        }

  });