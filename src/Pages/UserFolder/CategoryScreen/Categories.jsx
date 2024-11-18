import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Feather'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import Catlist from './Catlist'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useEffect } from 'react'
import images from '../../../assets/Categoryimages.json'




export default function Categories({navigation}) {


  const [categoryNames, setCategoryNames] = useState([]); 
  const [filteredImages, setFilteredImages] = useState([]); 


  




  async function getData()
  {
    const token= await AsyncStorage.getItem('token')
   
    axios.get('http://192.168.1.244:5000/get-categorydata',{params:{token}})
    .then((res)=>
    {
      
         if(res.data.status=='ok')
         {
          //  console.log(res.data.data)
           setCategoryNames(res.data.data);
         }
        
      
    })
    .catch((err)=>
    {
      Alert.alert(err)
    })
  }


  useEffect(() => {
    if (categoryNames.length > 0) {
      const filtered = images.filter(image => categoryNames.includes(image.name));
      // console.log(filtered)
      setFilteredImages(filtered);
    }
  }, [categoryNames]); 


  useFocusEffect(
    React.useCallback(() => {
      getData();
    
      
    },[]),
  );



















   



  return (
    <View style={{marginHorizontal:5}}>


    
      
      <View style={styles.header}>

       <Text style={styles.text}>All Categories</Text>

       <TouchableOpacity onPress={()=>navigation.navigate('Search1',{nav:'Categories'})}>
       <Ionicon name='search' size={28} color='black'/>
       </TouchableOpacity>
     
       </View>

       <FlatList data={filteredImages} renderItem={({item,index})=><Catlist item={item}/>} keyExtractor={(item)=>item.id} numColumns={2} showsVerticalScrollIndicator={false}  contentContainerStyle={{ paddingBottom: 100 }}/>


    
    </View>
  )
}

const styles = StyleSheet.create({
  header:
  {

    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor:'white',
    height:50,


  },
  text:
  {
    fontSize:22,
    fontWeight:'500',
    color:'black',
    marginRight:120
    
  }
})