import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import HomHeader from './Carosel'
import Search from './Search'
import Farmerlist from './Farmerlist'
import LinearGradient from 'react-native-linear-gradient'
import Footer from './Footer'
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'



export default function Hom() {

  const[userData,setUserData]=useState('');


  async function getData()
  {
    const token= await AsyncStorage.getItem('token')
    console.log(token);
    axios.get('http://192.168.1.244:5000/userdata',{params:{token:token}})
    .then((res)=>
    {
         setUserData(res.data.data)
        
      
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    
      
    },[]),
  );




  return (
    <LinearGradient
    colors={['#9acd32','#fffafa']}
    style={styles.container}
  >
    <ScrollView style={{marginHorizontal:10}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:50}}>
      <Header data={userData}/>
      <Search />
      <HomHeader/>
      <Farmerlist/>
      <Footer/>
    </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container:
  {
    flexL:1
  }
})