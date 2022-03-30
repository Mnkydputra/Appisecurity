import React, { useState ,Component  , useEffect  } from 'react';
import { View, Text , ActivityIndicator } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export default function  Logout ({navigation,route}) {

    const [loading,setLoading] = useState(true);

    const  logout = async() => {
      try {
        await AsyncStorage.removeItem('id_token');
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("id_akun");
        await AsyncStorage.removeItem("patrol");
        await AsyncStorage.removeItem("token_patrol");
        await AsyncStorage.removeItem("token_device");
        navigation.navigate('Login');
        return true;
      }
      catch(exception) {
        return false;
      }
    }
  useEffect(() => {
    //logout();
  }, []);
  

  
    return (
        <View style={{flex : 1 , justifyContent:'center' }}>
           <Text>BYE</Text>
        </View>
    );
  }
