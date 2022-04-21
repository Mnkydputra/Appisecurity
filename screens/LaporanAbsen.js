import React, { Component , useState , useEffect } from 'react';
import { View, Text , StyleSheet , BackHandler , FlatList , TouchableOpacity , Dimensions , ActivityIndicator , Image } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window");
export default function Profile({navigation , route }) {


    //tombol kembali 
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }


    useEffect(() => {
      const handleBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);

    const [loading,setLoading] = useState(true)
    const [bln,setBln] =useState([
      { id : '01' , bulan : 'Januari'} ,
      { id : '02' , bulan : 'Februari'} ,
      { id : '03' , bulan : 'Maret' } ,
      { id : '04' , bulan : 'April'} ,
      { id : '05' , bulan : 'Mei'} ,
      { id : '06' , bulan : 'Juni' } ,
      { id : '07' , bulan : 'Juli' } ,
      { id : '08' , bulan : 'Agustus' } ,
      { id : '09' , bulan : 'September'} ,
      { id : '10' , bulan : 'Oktober' } ,
      { id : '11' , bulan : 'November' } ,
      { id : '12' , bulan : 'Desember'} 
    ])
    //fungsi loading 
    const showLoad = () => {
      setTimeout(() => {
        setLoading(false);
      },3000)
    }
    showLoad();
    //


   const  renderItem = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('View Absen' , {
                      bulan : item.id ,
                      npk : route.params.npk ,
                      wilayah : route.params.wilayah 
                    })} >
          <View style={styles.row}>
            <View style={styles.headerViewAbsen}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.bulan}</Text>
              </View>
              <View style={styles.msgContainer}>
                {/* <Text style={styles.msgTxt}>{item.status}</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{flex:1 , backgroundColor:'#50C4DE'}}>
      { loading ? 
          <View style={{flex : 1 , justifyContent : 'center'}}>
              <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
            </View>
       :
        <View style={{ flex: 1 }} >
          <FlatList 
            // extraData={this.state}
            data={bln}
            keyExtractor = {(item) => {
              return item.id;
            }}
            renderItem={renderItem}/>
        </View>
      }
      </View>
    );

  }

  const styles = StyleSheet.create({
    row: {
      flex: 1, 
      margin:10,
      backgroundColor: "#50C4DE",
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    nameContainer: {
    width: width * 0.95, // 80% of screen's width
    height: height * 0.08, // 20% of screen's height
    alignItems: "center",
    borderRadius: 15,
    padding:5,
    backgroundColor:"#fff",
    
    },
    nameTxt: {
      fontWeight: 'bold',
      alignItems: "center",
      padding:15,
      color: '#222',
      fontSize: 18,
    },
    mblTxt: {
      fontWeight: '200',
      color: '#777',
      fontSize: 13,
      padding : 4 ,
      marginLeft : 90
    },
    msgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    msgTxt: {
      fontWeight: '400',
      color: '#008B8B',
      fontSize: 12,
      marginLeft: 15,
    },
  })

