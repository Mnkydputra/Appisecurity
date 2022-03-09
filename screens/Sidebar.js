import React, { Component , useState , useEffect } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList} from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome';
    export default function Sidebar ({navigation,navigate}) {

    const [data , setData ] =  useState([
        {id:1, image: "https://img.icons8.com/color/70/000000/cottage.png", title:"Ubah Status" , link : 'Edit Status' },
        {id:2, image: "https://img.icons8.com/color/70/000000/administrator-male.png", title:"Ubah Profile" , link : 'Edit Profile'},
        {id:3, image: "https://img.icons8.com/color/70/000000/filled-like.png", title:"Logout" , link : 'Logout'},
    ])


    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}/>
              <Text style={styles.name}>Jane Doe</Text>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList 
            style={styles.container} 
            enableEmptySections={true}
            data={data}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate( `${item.link}` , {
                    npk : '',
                  })}>
                  <View style={styles.box}>
                    {/* <Image style={styles.icon} source={{uri: item.image}}/> */}
                    <Icon style={[styles.icon,{fontSize:10}]} name="edit"></Icon>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.btn} source={{uri: "https://img.icons8.com/customer/office/40"}}/>

                    <Icon style={{marginTop:14}} name="chevron-right" ></Icon>
                  </View>
                </TouchableOpacity>
              )
          }}/>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    header:{
      backgroundColor: "#EE82EE",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "#FF6347",
      marginBottom:10,
    },
    icon:{
    //   width: 40,
    //   height: 40,
      marginTop:10
    },
    title:{
      fontSize:18,
      color:"#000",
      marginLeft:8 ,
      marginTop:3
    },
    btn:{
      marginLeft: 'auto',
    width: 40,
      height: 40,
    },
    body: {
      backgroundColor :"#E6E6FA",
    },
    box: {
      padding:5,
      marginBottom:3,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
    //   shadowColor: 'black',
    //   shadowOpacity: .2,
    //   shadowOffset: {
    //     height:1,
    //     width:-2
    //   },
      elevation:2
    },
    username:{
      color: "#20B2AA",
      fontSize:22,
      alignSelf:'center',
      marginLeft:10
    }
  });