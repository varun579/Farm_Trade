import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler';
import SubCatlist from './SubCatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import images from '../../../assets/SubCategory.json'
import { Alert } from 'react-native';

export default function SubCategory() {

  const[subcategorydata,setSubCategoryData]=useState([]);
  const[filteredImages,setFilteredImages]=useState([]);

  const route=useRoute();
  const name=route.params.data;
  //console.log(name)


  async function getData() {


    const token=await AsyncStorage.getItem('token');
   // console.log(token);
    axios.get('http://192.168.1.244:5000/get-subcategorydata',{params:{token,name}})
    .then((res)=>
    {
      
         if(res.data.status=='ok')
         {
          // console.log(res.data.data)
           setSubCategoryData(res.data.data);
         }
        
      
    })
    .catch((err)=>
    {
       Alert.alert(err)
    })







    
  }



  useEffect(() => {
    if (subcategorydata.length > 0) {
        const subname=subcategorydata.map((item)=>item.subname)
        //console.log(subname,1);
      //console.log(filtered)
     // console.log(images,2)
     // console.log(name,3)
      const array = images[name];
      //console.log(array,4);
      const filtered = array.filter(image => subname.includes(image.name));
     // console.log(filtered);

     setFilteredImages(filtered);
    }
  }, [subcategorydata]); 















  useFocusEffect(
    React.useCallback(() => {
      getData();
    
      
    },[]),
  );

  
  return (
    <View style={{backgroundColor:'white',marginHorizontal:5}}>
    <FlatList data={filteredImages} renderItem={({item,index})=><SubCatlist item={item} additionalData={subcategorydata}/>} keyExtractor={(item)=>item.id} numColumns={2} showsVerticalScrollIndicator={false}   contentContainerStyle={{ paddingBottom: 100 }}
      
    ListEmptyComponent={<Text style={styles.emptyText}>No Items Added By Any Farmer</Text>}
    
    />
    </View>
  )
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
})