import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet, TouchableOpacity, Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../Styles/styles2';
import AntDesign from 'react-native-vector-icons/AntDesign'





export default function FarmSub() {
    const route=useRoute()
    const [subcategory,setSubcategory]=useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [name,setName]=useState('')
    

    const id=route.params.id;
    
   // console.log(id)

      async function getSubdata()
       {
        
        axios.get('http://192.168.1.244:5000/get-subcategory',{params:{id}})
        .then((res)=>
        {
              if(res.data.status=='ok')
                {
                  setSubcategory(res.data.data)
                  setName(res.data.data.subname)
             
                }
                else
                {
                  //Alert.alert(res.data.error)
                }
        })


       }



  useFocusEffect(
    React.useCallback(() => {
    getSubdata();
    
      
    },[]),
  );
  
  const deleteSubcategory = async(id)=>
    {
       // console.log(id)



       Alert.alert(
        "Confirm Deletion",
    "Are you sure you want to delete this item?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            
            text: "Delete",
            onPress: () => {
              axios.delete('http://192.168.1.244:5000/delete-subcategory',{params:{id}})
              .then((res)=>
              {
                   if(res.data.status=='ok')
                    {
                       Alert.alert('SubCategory deleted')
                       getSubdata()
                    }
                    else
                    {
                       Alert.alert(res.data.error)
                    }
              })
        
            },
            style: "destructive",
        
          }
        ],
        { cancelable: false }
      );



  

    }


    const  updateSubCategory=async(_id)=>
      {
        
        if(price && quantity)
          {
            const token=await AsyncStorage.getItem('token');
            console.log(_id);
            const SubCategoryData=
            {
               
               price:(price),
               quantity:(quantity),
               token:token,
               productId:_id
           
            }
            axios.post('http://192.168.1.244:5000/updatesub-category',SubCategoryData)
            .then((res)=>
            {
              //console.log(res.data.data);
              if(res.data.status=='ok')
                {
                     Alert.alert(res.data.message);
                     getSubdata();
                }
               else
               {
                   Alert.alert(res.data.data)
               }
              
            })
            .catch((err)=>
            {
               Alert.alert(err)
            })
          }
          else
          {
             Alert.alert('Please Provide the inputs')
          }
       
      }











   
    const handleUpdate = (_id) => {
    
    
      console.log('Quantity:', quantity);
      console.log('Price per kg:', price);
      updateSubCategory(_id);
     
      setQuantity('');
      setPrice('');
     
      setSelectedCategory(null); 
    };









    
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
    data={subcategory}
    keyExtractor={(item,index) => item._id}
    renderItem={({ item }) => (
      <View style={[styles.categoryContainer,{flexDirection:'row'}]}>
        <View style={styles.textbox1}>
          <Text style={[styles.categoryText,{fontWeight:'500',marginTop:10}]}>Subcategory : {item.subname}</Text>
          
          <Text style={[styles.categoryText,{fontWeight:'500',marginTop:10}]}>AvailableStock : {item.quantity} Kg's</Text>
         
          <Text style={[styles.categoryText,{fontWeight:'500',marginTop:10}]}>PricePerKg : {item.price} Rs</Text>
          
          
        </View>

        <View>

          
         <TouchableOpacity onPress={() => setSelectedCategory(item._id)} style={[styles.buttonStyle]}>
         <AntDesign name='edit' size={25}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteSubcategory(item._id)} style={styles.buttonStyle}>
          <AntDesign name='delete' size={25}/>
          </TouchableOpacity>


        </View>
      </View>
    )}
    ListEmptyComponent={<Text style={styles.emptyText}>No Subcategories added yet</Text>}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 150 }}
  />

   {  selectedCategory && (

        <Modal>
        <View style={styles.subcategoryContainer}>
          <TouchableOpacity style={styles.wrong} onPress={() => setSelectedCategory(null)}>
            <Icon name='circle-with-cross' size={30} />
          </TouchableOpacity>

          <Text style={styles.subheading}>Edit Product Details</Text>


          <TextInput
            style={styles.subinput}
            placeholder="Enter Quantity (in kg)"
            value={quantity.toString()} 
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.subinput}
            placeholder="Enter Price per kg"
            value={price.toString()} 
            onChangeText={setPrice}
            keyboardType="numeric"
          />
           
          

          <Button title="Submit" onPress={()=>handleUpdate(selectedCategory)} />
        </View>
        </Modal>
      )}






























  
  </SafeAreaView>

  )
}

