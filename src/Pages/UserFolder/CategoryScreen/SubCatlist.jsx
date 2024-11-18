import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function SubCatlist({item, additionalData}) {

   const navigation=useNavigation();
   console.log(additionalData)
   const data=additionalData.filter(images=>item.name.includes(images.subname))
   const image=item.uri;
      
   
  return (
    

    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Item',{data:data,img:image})} >
    
        <Image
         
         source={{uri : item.uri}}
         style={styles.image}
        
        
        />
    
       
       <Text style={{color:'black',fontSize:20,fontWeight:'500'}}>{item.name}</Text>
     
      
      
       
        
      
    </TouchableOpacity>
   


    
  )
}

const styles = StyleSheet.create({
   
    container:
    {
       marginRight:10,
        marginTop:10,
        width:195,
        height:230,
        
        
        borderColor:'#d9d4cc'
    },
    image:
    {
         height:185,
         width:195,
         alignItems:'center',
         justifyContent:'center',
         borderRadius:10
    },
    



})