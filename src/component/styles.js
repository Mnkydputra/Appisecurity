import { StyleSheet , Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    height: "100%",
    // backgroundColor: "#87CEFA",
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#179bd4",
    width: "94%",
    height: "15%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuBox: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: windowWidth /  25,
  },
  linkAbsen: {
    backgroundColor: "#FFF",
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 50,
    marginTop:  windowHeight / 250,
    marginLeft: -120,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    width: 60,
    height: 60,
  },
  scanIMG: {
    width: 30,
    marginTop: 20,
    height: 30,
  },
  info: {
    fontSize: 14,
    color: "#fff",
  },
  headText : {
    margin : 15 ,
    fontSize : 26 ,
    fontWeight : 'bold' ,

  },
});