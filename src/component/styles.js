import { StyleSheet , Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    height: "100%",
    backgroundColor: "#50C4DE",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    width: width * 0.92, // 80% of screen's width
    height: height * 0.15, // 20% of screen's height
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 9,
    
  },
  menuBox: {
    width: width * 0.28, // 80% of screen's width
    height: height * 0.13, // 20% of screen's height
    alignItems: "center",
    borderRadius: 25,
    justifyContent : "center",
    margin: windowWidth /  55,
    backgroundColor:"#fff",
  },
  linkAbsen: {
    backgroundColor: "#00C19F",
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 50,
    marginTop: windowHeight / 250,
    marginLeft: -120,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    width: 50,
    height: 50,
  },
  scanIMG: {
    width: 30,
    marginTop: 20,
    height: 30,
  },
  info: {
    fontSize: 15,
    color: "#000000",
    fontWeight:"bold",
    fontStyle:"normal",
  },
  headText: {
    margin: 15,
    fontSize: 26,
    fontWeight: "bold",
  },
});