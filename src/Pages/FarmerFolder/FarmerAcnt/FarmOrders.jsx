import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator,Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';











const OrdersList = ({ farmerId }) => {
  
  
  const [filteredData,setFilteredData] = useState([]);
  const [amount,setAmount]=useState(0);
  const [id,setId]=useState('');

  

  async function getData()
  {

    try{


      const token= await AsyncStorage.getItem('token')
   
      const res=await axios.get('http://192.168.1.244:5000/get-farmerorders',{params:{token}})
    
    
        if(res.data.status=='ok')
       {
          
        // console.log(res.data.data[0].items)
        // console.log(res.data.farmerId)
        setId(res.data.farmerId)
         setFilteredData(res.data.data)
        
               
         
            
           
      }
        

    }
    catch(err)
    {
       Alert.alert("error: "+ err);
    }
   

    
      
    
  }

















    
  useFocusEffect(
    React.useCallback(() => {
      getData();
    
      
    },[]),
  );


 
  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.userInfo}>User: {item.userId.name}</Text>
      <Text style={styles.orderDetail}>Total Amount: ${item.farmerEarnings}</Text>
      <Text style={styles.productsTitle}>Products:</Text>
      {item.items
        .filter(product => product.farmerId === id) 
        .map((product, index) => (
          <View key={index} style={styles.productDetail}>

             <Image source={{ uri: product.uri }} style={styles.productImage} />
             <Text style={styles.orderDetail}>  - {product.productId?.subname}: {product.quantity} units</Text>
         
           
          </View>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
    
        <FlatList
          data={filteredData}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text style={styles.noOrdersText}>No orders found</Text>}
        />
     
    </View>
  );
};

export default OrdersList;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  orderContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
  
    borderWidth:1,
  
    elevation: 3,
    borderColor: 'green',
  },
  userInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'black'
  },
  orderDetail: {
    fontSize: 15,
    marginBottom: 4,
    color:'black'
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color:'black'
  },
  productDetail: {
    fontSize: 14,
    marginLeft: 20,
    flexDirection:'row',
    marginVertical:5,
    alignItems:'center'
  },
  noOrdersText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  productImage:
  {
    height:40,
    width:40
  }
});
