import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../UserFolder/AccountScreen/AccountScreens/Account';
import Wallet from '../UserFolder/AccountScreen/AccountScreens/Wallet';
import Profile from '../UserFolder/AccountScreen/AccountScreens/Profile';
import Addreses from '../UserFolder/AccountScreen/AccountScreens/Addreses';
import Orders from '../UserFolder/AccountScreen/AccountScreens/Orders';
import Wishlist from '../UserFolder/AccountScreen/AccountScreens/Wishlist';


const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (

   <Stack.Navigator screenOptions={{animation:'fade'}}>

     <Stack.Screen name='Account' component={Account}/>
     
     <Stack.Screen name='Wallet' component={Wallet}/>

     <Stack.Screen name='Profile' component={Profile}/>

     <Stack.Screen name='Orders' component={Orders}/>

     <Stack.Screen name='Addreses' component={Addreses}/>

     <Stack.Screen name='Wishlist' component={Wishlist}/>




   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})