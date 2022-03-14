import React, { useState ,Component  , useEffect  } from 'react';
import { View, Text , ActivityIndicator } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export default function  Logout ({navigation,route}) {

    const [loading,setLoading] = useState(true)

  useEffect(() => {

  }, []);
  
  const  logout = async() => {
    const st = await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id_akun");
    await AsyncStorage.removeItem("patrol");
    await AsyncStorage.removeItem("token_patrol");
    if(st === null) {
      navigation.navigate('Login')
    }
  }

  const showLoad = () => {
    setTimeout(() => {
      setLoading(false);
      logout();
    },3000)
  }
  showLoad();

  
    return (
        <View style={{flex : 1}}>
            {loading  ?
                <View style={{flex : 1 , justifyContent : 'center'}}>
                <ActivityIndicator size="large" color = 'red'></ActivityIndicator>
              </View>
              :
              null
            }
        </View>
    );
  }
