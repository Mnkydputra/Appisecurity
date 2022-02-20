
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity 
} from 'react-native';

 class HomeScreens extends Component {
  
  cek(){
    alert("tes");
    console.log("tes")
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>ABSENSI KERJA ?</Text>
          <View style={styles.linkAbsen}>
            <Image style={styles.scanIMG} source={require("../img/scan.png")}></Image>
            <Text onPress={this.cek} style={{ fontSize:18 }}>
              Scan QR Code</Text>
          </View>
        </View>


      <TouchableOpacity onPress={()=> this.cek()}>
        <View style={styles.menuBox} >
          <Image   style={styles.icon} source={require("../img/absensi.png")}/>
          <Text style={styles.info}>Absensi</Text>
        </View>
      </TouchableOpacity>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/policeman.png")}/>
          <Text style={styles.info}>Profile</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Course</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/inbox.png")}/>
          <Text style={styles.info}>Inbox</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Product</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Order</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Info</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Profile</Text>
        </View>

        <View style={styles.menuBox}>
          <Image style={styles.icon} source={require("../img/courses.png")}/>
          <Text style={styles.info}>Friends</Text>
        </View>

      </View>
    );
  }
}
export default HomeScreens ;
const styles = StyleSheet.create({
  container:{
    flex: 10,
    marginTop : 100,
    marginLeft:10 ,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#F08080",
    width:100,
    height:100,
    borderRadius:30 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:15
  },
  header:{
    backgroundColor: "#87CEFA",
    width:400,
    height:100,
    marginLeft:-6 ,
    borderRadius:20 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12
  },
  linkAbsen : {
    backgroundColor: "#fff",
    width:180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20 ,
    height:50, 
    flexDirection: 'row',
    flexWrap: 'wrap' ,
  },
  icon: {
    width:60,
    height:60,
  },
  scanIMG : {
    width:30,
    marginTop:20,
    height:30,
  },
  info:{
    fontSize:14,
    color: "#fff",
  }
});

                                            