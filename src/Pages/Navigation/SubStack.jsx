import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubCategory from '../UserFolder/CategoryScreen/SubCategory';
import Item from '../UserFolder/CategoryScreen/Item';


const Stack = createNativeStackNavigator();

export default function SubStack({route}) {

  const data=route.params.data

  return (

   <Stack.Navigator screenOptions={{headerShown:false, animation:'fade'}}>

     <Stack.Screen name='SubCategory' component={SubCategory}  initialParams={{ data }} options={{headerShown:true}} />
     
     <Stack.Screen name='Item' component={Item} options={{headerShown:true}}/>




   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})