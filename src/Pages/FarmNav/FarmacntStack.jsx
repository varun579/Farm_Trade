import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FarmAcnt from '../FarmerFolder/FarmerAcnt/FarmAcnt';
import FarmProfile from '../FarmerFolder/FarmerAcnt/FarmProfile';
import FarmWallet from '../FarmerFolder/FarmerAcnt/FarmWallet';
import FarmOrders from '../FarmerFolder/FarmerAcnt/FarmOrders'
import FarmAddress from '../FarmerFolder/FarmerAcnt/FarmAddress'

const Stack = createNativeStackNavigator();

export default function FarmacntStack() {
  return (

   <Stack.Navigator screenOptions={{headerShown:false,animation:'fade'}}>

     <Stack.Screen name='FarmAcnt' component={FarmAcnt}/>
   
    
     <Stack.Screen name='FarmProfile' component={FarmProfile} options={{headerShown:true}}/>

     <Stack.Screen name='FarmWallet' component={FarmWallet} options={{headerShown:true}}/>
     
     <Stack.Screen name='FarmOrders' component={FarmOrders} options={{headerShown:true}}/>

     <Stack.Screen name='FarmAddress' component={FarmAddress} options={{headerShown:true}}/>

   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})