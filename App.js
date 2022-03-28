import { StatusBar } from 'expo-status-bar';
import{ useEffect , React , useState } from 'react';
import { StyleSheet, Text, View , BackHandler , Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import Absensi from './screens/Absensi';
import Login from './screens/Login';
import DataDiri from './screens/DataDiri';
import Status from './screens/Status';
import Start from './screens/StartScreen';
import LaporanAbsen from './screens/LaporanAbsen' ;
import ViewAbsen from './screens/ViewAbsen' ;
import EditBiodata from './screens/EditBiodata' ;
import EditStatus from './screens/EditStatus' ;
import Poto from './screens/Poto' ;
import Sidebar from './screens/Sidebar' ;
import Logout from './screens/Logout' ;
import Profile from './screens/Profile' ;
import Splash from './screens/Splash' ;
import InputOT from './screens/InputOT' ;
import Absen from './screens/Absen';
import Pengajuan from './screens/Pengajuan';
import Register from './screens/Register';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash' 
        options = {{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* login screen */}
          <Stack.Screen name='Login' options={{ headerShown: false  , }}  component={Login}></Stack.Screen>
          <Stack.Screen name='Register' options={{ headerShown: false  , }}  component={Register}></Stack.Screen>
        {/* end */}

        {/* home screen */}
          <Stack.Screen name='Home' options={{headerShown: false  , }} component={Home}></Stack.Screen>
        {/* end */}

        {/* splash screen */}
          <Stack.Screen name='Start' component={Start}></Stack.Screen>
          <Stack.Screen options={{ headerShown: false  ,  }} name='Splash' component={Splash}></Stack.Screen>
        {/* end */}

        {/* lihat profile status dan poto */}
          <Stack.Screen name='Profile'  component={Profile}></Stack.Screen>
          <Stack.Screen name='Poto'  component={Poto}></Stack.Screen>
          <Stack.Screen name='Status' component={Status}></Stack.Screen>
        {/* end */}

        {/* edit poto profile dan status dan logout */}
          <Stack.Screen name='Edit Status' component={EditStatus}></Stack.Screen>
          <Stack.Screen name='Edit Profile' component={EditBiodata}></Stack.Screen>
          <Stack.Screen name='Akun' component={Sidebar}></Stack.Screen>
          <Stack.Screen name='Logout'  options={{ headerShown: false  , }} component={Logout}></Stack.Screen>
        {/* end */}

        {/* menu absensi  */}
          <Stack.Screen name='Absen'  component={Absen}></Stack.Screen>
          <Stack.Screen name='Input Overtime'  component={InputOT}></Stack.Screen>
          <Stack.Screen name='Pengajuan'  component={Pengajuan}></Stack.Screen>
          <Stack.Screen name='Absensi' options={{ headerShown: false  ,}}  component={Absensi}></Stack.Screen>
          <Stack.Screen name='View Absen' options={{ headerShown: false  , }}  component={ViewAbsen}></Stack.Screen>
          <Stack.Screen name='Laporan Absen'  component={LaporanAbsen}></Stack.Screen>
        {/* end */}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
