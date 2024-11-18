import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../UserFolder/CategoryScreen/Categories';
import Search1 from '../UserFolder/HomeScreen/Search1';
import Catlist from '../UserFolder/CategoryScreen/Catlist';
import SubCategory from '../UserFolder/CategoryScreen/SubCategory';
import SubStack from './SubStack';


const Stack = createNativeStackNavigator();

export default function CategoryStack() {
  return (

   <Stack.Navigator screenOptions={{headerShown:false, animation:'fade'}}>

     <Stack.Screen name='Categories' component={Categories}/>
     
     <Stack.Screen name='SubStack' component={SubStack}/>

     <Stack.Screen name='Search1' component={Search1}/>



   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})