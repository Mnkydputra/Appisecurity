import { StatusBar } from 'expo-status-bar';
import{ useEffect , React , useState } from 'react';
import { StyleSheet, Text, View , BackHandler , Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import Absensi from './screens/Absensi';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Status from './screens/Status';
import Start from './screens/StartScreen';
import LaporanAbsen from './screens/LaporanAbsen' ;
import ViewAbsen from './screens/ViewAbsen' ;
import EditBiodata from './screens/EditBiodata' ;
import EditStatus from './screens/EditStatus' ;
import Poto from './screens/Poto' ;
import Sidebar from './screens/Sidebar' ;
import Logout from './screens/Logout' ;
import Pro from './screens/Pro' ;
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login' 
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
      <Stack.Screen name='Start' component={Start}></Stack.Screen>
      <Stack.Screen name='Login'  component={Login}></Stack.Screen>
      <Stack.Screen name='Pro'  component={Pro}></Stack.Screen>
      <Stack.Screen name='Home'  
      options={{
          headerShown: false  , 
          
        }} component={Home}></Stack.Screen>
      <Stack.Screen name='Profile' component={Profile}></Stack.Screen>
      <Stack.Screen name='Poto'  component={Poto}></Stack.Screen>
      <Stack.Screen name='Status' component={Status}></Stack.Screen>
      <Stack.Screen name='Absensi' component={Absensi}></Stack.Screen>
      <Stack.Screen name='View Absen' component={ViewAbsen}></Stack.Screen>
      <Stack.Screen name='Laporan Absen'  component={LaporanAbsen}></Stack.Screen>
      <Stack.Screen name='Edit Profile' component={EditBiodata}></Stack.Screen>
      <Stack.Screen name='Edit Status' component={EditStatus}></Stack.Screen>
      <Stack.Screen name='Akun' component={Sidebar}></Stack.Screen>
      <Stack.Screen name='Logout' component={Logout}></Stack.Screen>
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
