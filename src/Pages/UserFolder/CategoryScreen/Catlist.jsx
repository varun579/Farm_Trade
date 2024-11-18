import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Catlist({item}) {
    const navigation = useNavigation(); 
    
  return (
    
    

    <TouchableOpacity  style={styles.container} onPress={()=>navigation.navigate('SubStack',{data:item.name})}>

    <Image
          source={{uri:item.uri}}
          style={styles.image} />

          <Text style={styles.text}>{item.name}</Text>

    </TouchableOpacity>


  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        marginHorizontal:5,
        
    
    },
    image:{

        height:230,
        width:190,
        borderWidth:1,
        borderRadius:12

    },
    text:
    {
        fontSize:20,
        marginLeft:3,
        marginTop:5,
        fontWeight:'500',
        color:'black'
    }
})