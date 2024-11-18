import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FarmHome from '../FarmerFolder/FarmerHome/FarmHome'
import FarmSub from '../FarmerFolder/FarmerHome/FarmSub';


const Stack = createNativeStackNavigator();

export default function FarmStack() {
  return (

   <Stack.Navigator screenOptions={{headerShown:false,animation:'fade'}}>

     <Stack.Screen name='FarmHome' component={FarmHome}/>
   
    
     <Stack.Screen name='FarmSub' component={FarmSub} options={{headerShown:true}}/>


     




   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})