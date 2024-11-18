import { StyleSheet, Text, View,Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';




export default function Item() {

  const [filteredData,setFilteredData] =useState([]);
  const [name,setName] =useState();


 const route=useRoute();

 

 //console.log(data)
 
 if(route.params.data.length===0){
  return(<View><Text style={{textAlign:'center',fontSize:20,fontWeight:'500',color:'black'}}>Item is not added yet by any farmer</Text></View>)
}
 const img=route.params.img;




async function getData() 
{
  //console.log("hii")

  if(route.params.name){

    const  data =route.params.data.filter((item)=>
      {
        // console.log(item.subname,route.params.name)
        return item.subname===route.params.name
      })
      console.log(data)
      
      setFilteredData(data)
      setName(route.params.name)

  }
  else
  {
    setFilteredData(route.params.data)
    setName(route.params.data[0].subname)
  }

  // console.log(filteredData)
    
}











 useFocusEffect(
  React.useCallback(() => {
    getData();

     
   


  
    
  },[]),
);


 
 // console.log(img);
     
  


    
   const addToCart = async(id,price)=>
  {
    const token= await AsyncStorage.getItem('token')
   //console.log(id,price);
    
    const data={

      token:token,
      productId:id,
      price:price,
      quantity:1




    }


   
    axios.post('http://192.168.1.244:5000/addtocart',data)
    .then((res)=>
    {
      
         if(res.data.status=='ok')
         {
           //console.log(res.data.data)
           Alert.alert(res.data.data)
         }
        
      
    })
    .catch((err)=>
    {
      Alert.alert(err)
    })



   }




    const farmerList = ({item,index})=>
    {
        return(
           <View style={styles.container}>
            {
              item.userId.image ?  <Image

              source={{uri:`http://192.168.1.244:5000/${item.userId.image}`}}
              style={styles.farmer}
              
              
              />:

              <Image
              source={{ uri: 'https://imgs.search.brave.com/B_007OrR9eaWJenb736UiExgsQuLsEBMBBWkKs2A_Ao/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc' }}
              style={styles.farmer}
            />

            }
           

            <View style={styles.textContainer}>

            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>{item.userId.name}</Text>
            <Text style={styles.text1}>price:{item.price} Rs/Kg</Text>
            <Text style={styles.text1}>Available:{item.quantity} Kg's</Text>
            </View>


            <View style={styles.butcontainer}>
             
            {
              item.quantity>=1 ? 

            <TouchableOpacity style={styles.addButton} onPress={()=>addToCart(item._id,item.price)}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            :
             
            <TouchableOpacity style={[styles.addButton,{backgroundColor:'red'}]} >
            <Text style={styles.addButtonText}>Out of Stock</Text>
            </TouchableOpacity>
            
            }


        </View>
      
    </View>


        )
    }

 
  return (

    <View style={{backgroundColor:'white'}}>
      {/* <Text>varun</Text> */}
     <Image
      
      source={{uri:img}}
     
      style={styles.image}
     />

     <View style={styles.farmerlist}>
    
 
      
    <FlatList
     
     ListHeaderComponent={() =>(
    
        <>
        <Text style={styles.text}>{name}</Text>
        {filteredData.length===1 ?  <Text style={styles.text}>{filteredData.length} Farmer is selling {name}</Text> :  <Text style={styles.text}>{filteredData.length} Farmers are selling {name}</Text>}
       
        </>
  
     ) 
        
        
       
    }
    contentContainerStyle={{ paddingBottom: 150 }}
    scrollEventThrottle={16} 
    
    data={filteredData}   renderItem={(item)=>farmerList(item)} keyExtractor={(item)=>item._id}/>
   
     </View>
    </View>
  )
}

const styles = StyleSheet.create({





    image:
    {
        height:280,
        width:480
    },
    farmerlist:
    {
        backgroundColor:'white',
        height:600,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        marginTop:-35
    },
    text:
    {
        fontSize:20,
        fontWeight:'600',
        color:'black',
        textAlign:'center',
        marginTop:20

    },
    farmer:
    {
        height:100,
        width:100,
        borderRadius:50
    },
    container:
    {
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 20, 
        height:100,
      


    },
    textContainer:
    {
      
         
        
    },
    text1:
    {
          fontSize:18,
          color:'black',
          fontWeight:'400'
    },
    buttonStyle: {
        backgroundColor: '#f44336',
        padding: 5,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: '#fff',
        fontWeight: 'bold',
      },

      butcontainer: {
        padding: 10,
        alignItems: 'center',
      },
      addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
      },
      addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      counterButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      counterButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      counterText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
      },
      

})

