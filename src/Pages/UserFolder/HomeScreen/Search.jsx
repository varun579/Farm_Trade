import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RollingBar from 'react-native-rolling-bar'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'; 

export default function Search() {
    
    const navigation = useNavigation();

  return (
   
      <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Search1',{nav:'Hom'})}>
        
       <Ionicon name='search' size={30} color='black'/>
       
       <View style={styles.textContainer}>
       <RollingBar interval={3000}>
        <Text style={styles.text}>Search "Vegetables"</Text>
        <Text style={styles.text}>Search for "Fruits"</Text>
        <Text style={styles.text}>Search for "Pulses"</Text>
        <Text style={styles.text}>Search for "Milk"</Text>
        <Text style={styles.text}>Search for "Ghee"</Text>
        <Text style={styles.text}>Search for "Apples"</Text>
       </RollingBar>
       </View>
     
     
       <Ionicon name='mic' size={30} color='black'/>


      </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    container:
    {
        marginTop:20,
        flexDirection:'row',
        backgroundColor:'white',
        height:55,
        // marginLeft:5,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:12,
        

    },
    textContainer:
    { 
        marginLeft:-110
    },
    text:
    {
        fontSize:20,
        color:'black'
    }

})