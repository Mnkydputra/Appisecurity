import { StatusBar } from 'expo-status-bar';
import{ useEffect , React , useState } from 'react';
import { StyleSheet, Text, View , BackHandler , Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Absensi from './screens/Absensi';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Status from './screens/Status';
const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login' 
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen name='Login'  component={Login}></Stack.Screen>
      <Stack.Screen name='Home'  component={Home}></Stack.Screen>
      <Stack.Screen name='Profile'  component={Profile}></Stack.Screen>
      <Stack.Screen name='Status' component={Status}></Stack.Screen>
      <Stack.Screen name='Absensi' component={Absensi}></Stack.Screen>
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
