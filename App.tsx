import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Frst from './src/Pages/HomeScreens/Frst'
import Login from './src/Pages/HomeScreens/Login'
import Signup from './src/Pages/HomeScreens/Signup'
import Home from './src/Pages/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Hom from './src/Pages/UserFolder/HomeScreen/Hom'
import Farmer from './src/Pages/Farmer'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabNav from './src/Pages/Navigation/TabNav'
import Profile from './src/Pages/UserFolder/AccountScreen/AccountScreens/Profile'
import Account from './src/Pages/UserFolder/AccountScreen/AccountScreens/Account'
import Header from './src/Pages/UserFolder/HomeScreen/Header'
import Categories from './src/Pages/UserFolder/CategoryScreen/Categories'
import FarmerDashboard from './src/Pages/FarmerDashboard'
import Manage from './src/Pages/Manage'
import FarmerProfile from './src/Pages/UserFolder/HomeScreen/FarmerProfile'
import FarmTab from './src/Pages/FarmNav/FarmTab'
import SubCatlist from './src/Pages/UserFolder/CategoryScreen/SubCatlist'
import CategoryStack from './src/Pages/Navigation/CategoryStack'
import DropdownComponent from './src/Pages/FarmerFolder/FarmerHome/Dropdown'
import OrdersPage from './src/Pages/UserFolder/AccountScreen/AccountScreens/Orders'
import Carosel from './src/Pages/UserFolder/HomeScreen/Carosel'
const Stack = createNativeStackNavigator();

const LoginNav=()=>
  {
    return(

     
      <Stack.Navigator screenOptions={
        {headerShown:false, animation:'fade'}
        
      }>
      <Stack.Screen name="Frst" component={Frst}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:true}} />
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:true}}/>
      <Stack.Screen name='TabNav'  component={TabNav} />
      <Stack.Screen name='FarmTab' component={FarmTab}/>
      </Stack.Navigator>
    
   

    )
  }

export default function App() {

   const [isLoggedIn,setLoggedIn] = useState(true)
  
   async function getData()
   {
       const data=await AsyncStorage.getItem('isLoggedIn');
      console.log(data)
       setLoggedIn(data);
   }   

   useEffect(()=>
  {
      getData();
  },[])
  

  return (
    
   
    <GestureHandlerRootView style={{ flex: 1 }}>
     
    <NavigationContainer>
    
    {/* <Account/> */}

      {/* <SubCatlist/> */}
      {/* <Farmer></Farmer> */}
      {/* <OrdersPage/> */}
      {/* <Carosel/> */}
     

   {/* {isLoggedIn ? <FarmTab/> :<TabNav/>} */}
       <LoginNav/> 
       {/* <DropdownComponent/> */}
        {/* <Farmer/> */}
        {/* <FarmerDashboard/>
   */}
       {/* <CategoryStack/> */}
       {/* <Manage/> */}
     {/* <Farmer></Farmer> */}
     
      {/* <U></U>     */}
      {/* <Hom></Hom> */}
      {/* <Profile/> */}
      {/* <Categories/> */}
    
     {/* <TabNav/> */}
     {/* <FarmerProfile/> */}
     {/* <FarmTab/> */}
   
     
    </NavigationContainer>
  
    
    </GestureHandlerRootView>
   
   
   
   
  )
}

const styles = StyleSheet.create({})