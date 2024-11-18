import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet, TouchableOpacity, Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../../Styles/styles2';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'
import categoryImages from '../../../assets/Categoryimages.json'



const App = () => {

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [display,setDisplay] =useState(true)
  const [data, setData] = useState([
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Pulses', value: 'Pulses' },
    { label: 'DairyProducts', value: 'DairyProducts' },
    { label: 'Seeds', value: 'Seeds' },
    { label: 'Rice', value: 'Rice' },
  ]);
  const [filteredData,setFilteredData]=useState([])
 
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    


  const navigation=useNavigation()


  useFocusEffect(
    React.useCallback(() => {
      getData();
    
      
    },[]),
  );




  


  async function addData(category)
  {
  
    const token= await AsyncStorage.getItem('token')
   console.log(category);
    const categoryData={
     token:token,
     category:category


    }
    axios.post('http://192.168.1.244:5000/add-category',categoryData)
    .then((res)=>
    {
      if(res.data.status=='ok')
        {
          console.log(res.data.data)
          Alert.alert(res.data.data + "  Category Created");
          getData()
        }
       else if(res.data.status==400)
        {
          Alert.alert(res.data.data);
        }
       else
       {
         Alert.alert(res.data.error)
       }
      
    })
  }

  async function getData()
  {
    const token=await AsyncStorage.getItem('token');
  //  console.log(token)
    
    axios.get('http://192.168.1.244:5000/get-category',{params:{token}})
    .then((res)=>
    {
        
          if(res.data.status=='ok')
            {

            
              // console.log(res.data.data)
              setCategories(res.data.data);
         
            }
            else
            {
              Alert.alert(res.data.error)
            }
    })
    
  }

  async function deleteData(id)
  {
    console.log(id)
  
      axios.delete('http://192.168.1.244:5000/delete-category',{params:{id}})
      .then((res)=>
      {
           if(res.data.status=='ok')
            {
                Alert.alert('Category deleted')
                getData();
            }
            else
            {
               Alert.alert(res.data.error)
            }
      })
  }
  const addCategory = async () => {
    if (category.length > 0) {
       
      
      const categoryExists = data.some(item => item.value === category);
  
      if (!categoryExists) {
        
        setData(prevData => [...prevData, { label: category, value: category }]);
        
      } else {
      
         await addData(category);


      }
  
      setCategory('');
      setSelectedCategory(null);
      setDisplay(true)
    } else {
      Alert.alert("Please Give Valid Input");
    }
  };
  
  const deleteCategory = (id,name) => {

    //setCategories(categories.filter((item) => item._id !== id));
    setData((prevData) => prevData.filter((item) => item.value !== name));

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
              onPress: () => deleteData(id),
              style: "destructive",
          
            }
          ],
          { cancelable: false }
        );
    

    
    getData()
    
    if (selectedCategory === id) {
      setSelectedCategory(null);
    }
    
  };
 
  const addSubCategory=async(_id)=>
    {
      
      if(subcategory && description && price && quantity)
        {
          const token=await AsyncStorage.getItem('token');
          console.log(_id);
          const SubCategoryData=
          {
             subname:subcategory,
             description:description,
             price:Number(price),
             quantity:Number(quantity),
             token:token,
             categoryId:_id
         
          }
          axios.post('http://192.168.1.244:5000/addsub-category/',SubCategoryData)
          .then((res)=>
          {
            if(res.data.status=='ok')
              {
                  Alert.alert(res.data.message);
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


  const handleSubmit = (_id) => {
    
    console.log('Subcategory:', subcategory);
    console.log('Description:', description);
    console.log('Quantity:', quantity);
    console.log('Price per kg:', price);
    addSubCategory(_id);
    setDescription('');
    setQuantity('');
    setPrice('');
    setSubcategory('');
    setSelectedCategory(null); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome to FarmTrade</Text>

      <View style={styles.inputContainer}>
      
      { display ? <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
         
          onChange={item => {
            setCategory(item.value);
           // console.log(category);
           
          }}
        
        />
        
        : <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={category}
          onChangeText={setCategory}
        /> 

        }
      
      </View>

        <View style={styles.box}> 

             <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: '#4CAF50' }, { height: 35 },{marginRight:10}]}
                onPress={()=>setDisplay(!display)}
              >
                <Text style={styles.deleteText}>Add New Category</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={addCategory}
               style={[styles.buttonStyle, { backgroundColor: '#4CAF50' }, { height: 35 }]}>
                <Text style={styles.deleteText}>Add Category</Text>
              </TouchableOpacity>

        </View>
      


      
       
       
    

      <FlatList
        data={categories}
        keyExtractor={(item,index) => item._id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <View style={styles.textbox}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>

            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: 'rgba(76, 175, 80, 1)' }, { height: 35 }]}
                onPress={() => setSelectedCategory(item._id)}
              >
                <Text style={styles.deleteText}>Add SubCategory</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('FarmSub',{id:item._id,name:item.name})}
               style={[styles.buttonStyle, { backgroundColor: '#4CAF50' }, { height: 35 }]}>
                <Text style={styles.deleteText}>SubCategory++</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => deleteCategory(item._id,item.name)} style={styles.buttonStyle}>
               <AntDesign name='delete' size={25}/>
              </TouchableOpacity>

            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 150 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No categories added yet</Text>}
        showsVerticalScrollIndicator={false}
      />

      { selectedCategory && (
        <Modal>
        <View style={styles.subcategoryContainer}>
          <TouchableOpacity style={styles.wrong} onPress={() => setSelectedCategory(null)}>
            <Icon name='circle-with-cross' size={30} />
          </TouchableOpacity>

          <Text style={styles.subheading}>Add Product Details</Text>

          <TextInput
            style={styles.subinput}
            placeholder="Enter Subcategory Name"
            value={subcategory}
            onChangeText={setSubcategory}
          />

          <TextInput
            style={styles.subinput}
            placeholder="Enter Product Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />
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


          <Button title="Submit" onPress={()=>handleSubmit(selectedCategory)} />
        </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};



export default App;
