import { Button, StyleSheet, Text, View, BackHandler,Alert} from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
// import ImagePicker from 'react-native-image-crop-picker';




export default function Home({navigation}) {

 
  function logout()
  {
    
   
    AsyncStorage.setItem('isLoggedIn','')
    AsyncStorage.setItem('token','')
    navigation.navigate('Login');


    
     
  }
   
  async function getData()
  {
    const token= await AsyncStorage.getItem('token')
   // console.log(token);
    axios.post('http://192.168.1.244:5000/userData',{token:token})
    .then((res)=>
    {
      console.log(res.data)
      
    })
  }
  const handleBackPress=()=>
  {
    Alert.alert('Exit App','Are you sure want to exit',
    [
      {text:'Cancel',onPress:()=>null,style:'cancel'},
      
      {text:'Exit', onPress:()=>BackHandler.exitApp()}
    ])
    return true;
  }
  useFocusEffect(
    React.useCallback(()=>{

      BackHandler.addEventListener('hardwareBackPress',handleBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };



    })
  )
  useEffect(()=>
  {
      getData();     

  },[])

  return(
    <View>
      <Text>Home</Text>
      <Button title='logout' onPress={()=>logout()}/>
    </View>
  )
  
}

const styles = StyleSheet.create({})