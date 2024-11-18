import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Footer() {
    const navigation=useNavigation();
  return (
    <View style={{marginTop:20}}>
      <View style={styles.container1}>

        <TouchableOpacity onPress={()=>navigation.navigate('SubStack',{data:"Vegetables"})} >
         <Image
           
           source={{uri:'https://imgs.search.brave.com/YhA_BA9vmznjZ6_IgsRVkmbN5q-TJsiLu_BygaZhwns/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2ZydWl0cy1h/bmQtdmVnZXRhYmxl/cy1wbmctaGQtY29w/eXJpZ2h0LTIwMTQt/dHVya2lzaC1zZWN0/b3Itb2YtZnJlc2gt/ZnJ1aXQtdmVnZXRh/Ymxlcy1hbGwtcmln/aHRzLXJlc2VydmVk/LTMxOC5wbmc'}}
           style={styles.con11}
          
          />
          <Text style={[styles.text,{marginTop:20}]}>Vegetables</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('SubStack',{data:"DairyProducts"})} >
                 
        <Image
            
            source={{uri:'https://imgs.search.brave.com/x8AKhGGEJwdexX4GW8J_J9Pe61jOZVQWxHRqmN1JHUc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMS9EYWly/eS1QTkctSW1hZ2Ut/QmFja2dyb3VuZC5w/bmc'}}
            style={styles.con12}
            
                />
            <Text style={styles.text}>Dairy Products</Text>
       
         
    


        </TouchableOpacity>

       
      </View>
     
      <View style={styles.container2}>

            <TouchableOpacity onPress={()=>navigation.navigate('SubStack',{data:"Fruits"})}>

           <Image
           
            source={{uri:'https://imgs.search.brave.com/6v1fQ-A8chKkd9oBZBNpuEI44P_IwCrC6XXGLWCP11Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2ZydWl0cy1h/bmQtdmVnZXRhYmxl/cy1wbmctaGQtZnJ1/aXQtcG5nLXBpY3R1/cmUtMTY5OC5wbmc'}}
            style={styles.con11}
          
            />
            <Text style={styles.text}>Fruits</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('SubStack',{data:"Pulses"})} >

                <Image
                
                source={require('../../../assets/pulses.png')}
                style={[styles.con12,{height:130}]}
                
                />
                <Text style={[styles.text]}>Pulses</Text>



            </TouchableOpacity>

            
     </View>


       






    </View>
  )
}

const styles = StyleSheet.create({
    container1:
    {
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       marginBottom:20

    },
    container2:
    {

       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       marginBottom:5

    },
    con11:
    {
           height:130,
           width:190,
           
           
           
    },
    con12:
    {
        height:150,
        width:190,
     
    },
   
    text:
    {
        fontSize:20,
        fontWeight:'500',
        color:'black',
        textAlign:'center'
    }
})