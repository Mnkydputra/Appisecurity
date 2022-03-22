import React, { Component , useState , useEffect , useRef } from 'react';
import { View, Text , StyleSheet , TouchableOpacity , Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });




  

export default function InputOT ({navigation , route}){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
    }

    const sendMessage = async (token) => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method : 'POST' ,
            headers : {
                Accept : 'application/json' ,
                'Accept-encoding' : 'gzip, deflate' ,
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                to : 'ExponentPushToken[2epmKsI76XouHdEs-ba9xx]' , 
                title : 'Approval Lemburan' ,
                body  : 'Anggota Mengajukan Lembur' ,
                data : {data : 'goes here'} ,
                _displayInForeground : true 
            }),
        })
    }
    return (
      <View style={styles.container}>
        <Text> Selamat Datang  </Text>
        <TouchableOpacity onPress={sendMessage}>
            <Text style={styles.text}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    );
  }



  const styles = StyleSheet.create({
      container : {
          flex : 1 ,
          justifyContent : 'center' ,
          alignItems : 'center'
      } ,
      text : {
          color : 'brown'
      }
  })