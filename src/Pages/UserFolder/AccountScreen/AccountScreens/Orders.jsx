import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MIcons from 'react-native-vector-icons/MaterialIcons';

export default function OrdersPage() {

  const[filteredData,setFilteredData]=useState([]);
  const[orderData,setOrderData]=useState([]);



  async function getData()
  {

    try{


      const token= await AsyncStorage.getItem('token')
   
      const res=await axios.get('http://192.168.1.244:5000/get-orderdetails',{params:{token}})
   
    
        if(res.data.status=='ok')
       {
           //console.log(res.data.data)
           setFilteredData(res.data.data);
          
            
           
       }
        

    }
    catch(err)
    {
       
    }

    
      
    
  }



















































  useFocusEffect(
    React.useCallback(() => {
      getData();
      
    
      
    },[]),
  );



 const arr=  [
    
    {
      "id":"01",
      "name":"Fruits",
       "uri":"https://imgs.search.brave.com/v14VcJRTYWeHL2jRx_7plxu1QsRukmbojNgmWQivZ5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg5/NDE1NzA4L3Bob3Rv/L2ZyZXNoLWZydWl0/cy1hbmQtdmVnZXRh/Ymxlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9YUJGR1VV/LTk4cG5vaHQ3M2Nv/OHIyVFpJS0YzTUR0/QkJ1OUtTeHR4S19D/MD0",
      "uri1":"https://imgs.search.brave.com/x24e3dMnfYZBrtFP9zcF5255TuKsALaeoCrc-SZftL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9idW5jaC1kaWZm/ZXJlbnQtZnJ1aXRz/LWluY2x1ZGluZy1v/bmUtdGhhdC1oYXMt/ZnJ1aXQtaXRfMTMx/NjI2My0yMTQwMTMu/anBnP3NpemU9NjI2/JmV4dD1qcGc",
      "uri2":"https://imgs.search.brave.com/z1ePzGaEwyWBs60RLTusRR929Vwl4kegFeU_kzfTa68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYz/NzI5NjQ3L3Bob3Rv/L2FuLXVwLWNsb3Nl/LXBpY3R1cmUtb2Yt/b3JnYW5pYy1sZWd1/bWVzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1FOU5kY1Ny/NFN4UmFZdEtqampr/NnJGb0h2dzY5bW9v/WDVhWTc4SjM0RE1Z/PQ"
    },
     
    {
      "id":"02",
      "name":"Fruits",
       "uri":"https://imgs.search.brave.com/v14VcJRTYWeHL2jRx_7plxu1QsRukmbojNgmWQivZ5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg5/NDE1NzA4L3Bob3Rv/L2ZyZXNoLWZydWl0/cy1hbmQtdmVnZXRh/Ymxlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9YUJGR1VV/LTk4cG5vaHQ3M2Nv/OHIyVFpJS0YzTUR0/QkJ1OUtTeHR4S19D/MD0",
      "uri1":"https://imgs.search.brave.com/x24e3dMnfYZBrtFP9zcF5255TuKsALaeoCrc-SZftL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9idW5jaC1kaWZm/ZXJlbnQtZnJ1aXRz/LWluY2x1ZGluZy1v/bmUtdGhhdC1oYXMt/ZnJ1aXQtaXRfMTMx/NjI2My0yMTQwMTMu/anBnP3NpemU9NjI2/JmV4dD1qcGc",
      "uri2":"https://imgs.search.brave.com/z1ePzGaEwyWBs60RLTusRR929Vwl4kegFeU_kzfTa68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYz/NzI5NjQ3L3Bob3Rv/L2FuLXVwLWNsb3Nl/LXBpY3R1cmUtb2Yt/b3JnYW5pYy1sZWd1/bWVzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1FOU5kY1Ny/NFN4UmFZdEtqampr/NnJGb0h2dzY5bW9v/WDVhWTc4SjM0RE1Z/PQ"
    },
 
   
  ]








  




  const convertToIST = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };









  const renderOrderItem = ({ item }) => (

    <View style={styles.orderItem}>

      <View style={styles.imageView}>

       {

        item.items.map((item,index)=>
        {
          if(index<5){
          return(

            <View key={item._id} style={styles.eachImageView}>

           <Image source={{uri:item.uri}}
         
            style={styles.image}
        
             />
           </View>
          )
         }
         else if(index==6)
         {
          return(

            <View key={item._id} style={{justifyContent:'center',alignItems:'center',marginLeft:-8}}>
             
             <MIcons name='arrow-forward-ios' color='black' size={20}/>

            </View>
          )


         }




        })


       }

        

        
       
      </View>



      <View>


      <View style={{flexDirection:'row',width:130,justifyContent:'space-between'}}>
        <Text style={{fontSize:15,fontWeight:'600',color:'black'}}>Order delivered</Text>
        <Icons name='checkmark-circle' color='#29a329' size={20}/>
      </View>

      <View  style={{flexDirection:'row',justifyContent:'space-between'}}>

        <Text style={{color:'black'}}>placed at {convertToIST(item.createdAt)}</Text>
        <Text style={{color:'black', fontWeight:'bold',fontSize:16}}>{item.totalAmount} Rs</Text>

     </View>

   </View>

     











    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='cart-outline' size={58} color='#daa520' />
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        style={styles.orderList}
        showsVerticalScrollIndicator={false}
      />

      {/* <TouchableOpacity style={styles.button} onPress={addOrder}>
        <Text style={styles.buttonText}>Add New Order</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    paddingHorizontal: 10,
    backgroundColor:'#f2f2f2',
    flex:1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor:'white'
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#228b22',
    marginLeft: 10,
  },
  orderList: {
    marginBottom: 20,
  },
  orderItem: {
   
  
    borderWidth: 1,
    borderColor: '#228b22',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor:'white',
    height:130,
    justifyContent:'space-between',
    elevation:8,
    shadowColor:'green'
   
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDetails: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#228b22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  imageView:
  {
    flexDirection:'row',
 
    
    
  },
  image:
  {
    height:40,
    width:40,
   
    
  },
  eachImageView:
  {
    borderWidth:1,
    borderRadius:5,
    borderColor:'gray',
    padding:5,
    height:54,
    width:54,
    justifyContent:'center',
    alignItems:'center',
    marginRight:8,
  }
});
