import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hom from '../UserFolder/HomeScreen/Hom'
import Search1 from '../UserFolder/HomeScreen/Search1';
import FarmerProfile from '../UserFolder/HomeScreen/FarmerProfile';
import SubStack from './SubStack';
import Item from '../UserFolder/CategoryScreen/Item';
import FarmerSec from '../UserFolder/HomeScreen/FarmerSec'


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (

   <Stack.Navigator screenOptions={{headerShown:false,animation:'fade'}}>

     <Stack.Screen name='Hom' component={Hom}/>
   
    
     <Stack.Screen name='Search1' component={Search1}/>

     <Stack.Screen name='FarmerProfile' component={FarmerProfile} options={{headerShown:true}}/>
     <Stack.Screen name='SubStack' component={SubStack}/>
     <Stack.Screen name='Item' component={Item}  options={{headerShown:true}}/>
     <Stack.Screen name='FarmerSec' component={FarmerSec} options={{headerShown:true}}/>




   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})