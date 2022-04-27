import React, { Component , useState , useEffect, useCallback } from 'react';
import { View, Text , StyleSheet , TouchableOpacity ,FlatList , Alert, Dimensions , Image  ,RefreshControl , ScrollView , ActivityIndicator  , Modal , BackHandler } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
 

export default function ShowSuratSakit({navigation,route}){
    const images = [{
        url: route.params.url +"?time="+ new Date(),
        // url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
        props: {
            // Or you can set source directory.
        }
    }]
    const [visible, setIsVisible] = useState(true);

    const closeModal = () => {
          setIsVisible(false)
    }
    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };
    useEffect(() => {
        // console.log(route.params.url)
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    },[])
        return (
            <View style={{flex:1 , justifyContent:'center'}} >
                <Modal visible={visible} transparent onRequestClose={handleBackPress}>
                    <ImageViewer imageUrls={images}/>
                </Modal>
            </View>
        )
}