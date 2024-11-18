import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import subImages from '../../../assets/SubCategory.json';

export default function FarmerSec() {
  const [subcategorydata, setSubCategoryData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterlist, setFilterList] = useState([]);

  const route = useRoute();
  const farmerId = route.params.farmerId;

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      setSubCategory(Object.values(subImages).flat());

      const res = await axios.get('http://192.168.1.244:5000/get-farmersubcategory', {
        params: { token, farmerId },
      });

      if (res.data.status === 'ok') {
        setSubCategoryData(res.data.data);
        const datalist = [];

        res.data.data.forEach((item) => {
          subCategory.forEach((product) => {
            if (item.subname === product.name) {
              datalist.push({ ...item, uri: product.uri });
            }
          });
        }); 
       // console.log(datalist)
        setFilterList(datalist);
      }
    } catch (err) {
      Alert.alert('Error:', err.message);
    }
  };


  // useEffect(() => {
  //   setSubCategory(Object.values(subImages).flat());
  // }, []);

   
  // useFocusEffect(
  //   React.useCallback(() => {
  //      getData();
  //   }, [subCategory]) 
  // );

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [farmerId, subCategory])
  );
  

    
  const addToCart = async(id,price)=>
    {
      const token= await AsyncStorage.getItem('token')
     console.log(id,price);
      
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
  

































  const renderFunction = ({ item }) => (
    <View style={styles.main}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.text}>{item.subname}</Text>
        <Text style={styles.infoText}>Price: {item.price} Rs</Text>
        <Text style={styles.infoText}>Available Stock: {item.quantity} Kg's</Text>
      </View>
      {
              item.quantity>=1 ? 

            <TouchableOpacity style={styles.addButton} onPress={()=>addToCart(item._id,item.price)}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            :
             
            <TouchableOpacity style={[styles.addButton,{backgroundColor:'#ff4d4d'}]} >
            <Text style={styles.addButtonText}>Out of Stock</Text>
            </TouchableOpacity>
            
            }
    </View>
  );




  return (
    <View style={styles.container}>
      <FlatList
        data={filterlist}
        renderItem={renderFunction}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No Items Added By Farmer</Text>}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  main: {
    height: 100,
    width: '95%',
    borderWidth: 0.9,
    marginHorizontal: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#9acd32',
    elevation: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
  content: {
    justifyContent: 'center',
    marginLeft: 10,
  
    width:180
   
   
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
  infoText: {
    fontSize: 17,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
});
