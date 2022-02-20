import React, { Component } from 'react';
import { View, Text , TouchableOpacity , StyleSheet , Image , Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>ABSENSI KERJA ?</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Absensi', {
              nama : 'dasep'  ,
              npk : '228572' ,
              id_akun : 'AGT-228572' ,
              wilayah : 'WIL2' ,
              area_kerja : 'VLC'
            })}>
                <View style={styles.linkAbsen}>
                  <Image style={styles.scanIMG} source={require("../img/scan.png")}></Image>
                  <Text onPress={this.cek} style={{ fontSize:18 }}>
                    Scan QR Code</Text>
                </View>
            </TouchableOpacity>
        </View>


      <TouchableOpacity>
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

const styles = StyleSheet.create({
  container:{
    flex: 10,
    // marginTop : 10,
    // marginLeft:10 ,
    width : windowWidth ,
    flexDirection: 'row',
    flexWrap: 'wrap' ,
    backgroundColor : '#fff'
  },
  menuBox:{
    backgroundColor: "#F08080",
    width:100,
    height:100,
    borderRadius:30 ,
    alignItems: 'center',
    justifyContent: 'center',
    margin:18
  },
  header:{
    backgroundColor: "#87CEFA",
    width:400,
    height:100,
    marginLeft:4 ,
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