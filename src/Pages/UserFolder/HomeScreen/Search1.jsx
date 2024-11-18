import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import images from '../../../assets/Categoryimages.json'
import subImages from '../../../assets/SubCategory.json'
import SubCategory from '../CategoryScreen/SubCategory'

export default function Search1({navigation}) {
    
    
    const route=useRoute();
    const path=route.params.nav
    const[search,setSearch]=useState(false)
    const[filter,setFilter]=useState('')
    const [categoryNames, setCategoryNames] = useState([]); 
    const [category, setCategory] = useState([]); 
    const [subCategoryNames,setSubCategoryNames] =useState([])
    const [subCategory,setSubCategory]=useState([])
    const[subCategoryData,setSubCategoryData]=useState([])
    const [filteredSubCategoryData, setFilteredSubCategoryData] = useState([]);



 


  // async function getData()
  // {
  //   const token= await AsyncStorage.getItem('token')
   
  //   axios.get('http://192.168.1.244:5000/get-categorydata',{params:{token}})
  //   .then((res)=>
  //   {
      
  //        if(res.data.status=='ok')
  //        {
  //          //console.log(res.data.data)
  //          setCategoryNames(res.data.data);
  //          setCategory(res.data.data);
  //        }
        
      
  //   })
  //   .catch((err)=>
  //   {
  //     Alert.alert(err)
  //   })
  // }

  

  async function getData() {


    const token=await AsyncStorage.getItem('token');
   // console.log(token);
    axios.get('http://192.168.1.244:5000/get-subcategorydata',{params:{token}})
    .then((res)=>
    {
      
         if(res.data.status=='ok')
         {
          //  console.log(res.data.data1)
           setSubCategoryData(res.data.data1);
         }
        
      
    })
    .catch((err)=>
    {
       Alert.alert(err)
    })


  }


  








    useFocusEffect(
      React.useCallback(() => {
        getData();

          //setCategoryNames(images);
          setCategory(images);
          setSubCategory(Object.values(subImages).flat());
       


      
        
      },[]),
    );

    const handleSearch=(text)=>
    {
      setFilter(text);

      if(text.length===0)
        {
        
          setCategoryNames([]);
          setSubCategoryNames([]);
          setFilteredSubCategoryData([]); 
        }
        else
        {

          const newItems=category.filter((item)=>
            {
               //console.log(item.toLowerCase())
              return item.name.toLowerCase().includes(text.toLowerCase());

            })
           // console.log(newItems)
           setCategoryNames(newItems);


           const subItems=subCategory.filter((item)=>
            {
               //console.log(item.toLowerCase())
              return item.name.toLowerCase().startsWith(text.toLowerCase());

            })
            //console.log(subItems)
           setSubCategoryNames(subItems);


           
           const names=subItems.map((item)=>
          {
               return (item.name.toLowerCase())
          })
          console.log(names)

          const filteredData = subCategoryData.filter((item)=>
          {
               return names.includes(item.subname.toLowerCase())
            
          })
          console.log(filteredData)

          setFilteredSubCategoryData(filteredData);











        }
        

    }
   



  

    const nav=()=>
      {
          if('Hom'===path)
            {
              navigation.navigate('Hom')
            }
          else{
            navigation.navigate('Categories')
          }
      }

   const renderFunction =({item,index})=>
   {
     return(
       <TouchableOpacity style={styles.flatList} onPress={()=>navigation.navigate('SubStack',{data:item.name})}>
           <Image
             
             source={{uri:item.uri}}
             style={styles.image}
            
            />
            <Text style={styles.text}>{item.name}</Text>
       </TouchableOpacity>
     )
   }


   const rendersubFunction =({item,index})=>
    {
      return(
        <TouchableOpacity style={styles.flatList} onPress={()=>navigation.navigate('Item',{data:filteredSubCategoryData,img:item.uri,name:item.name})}>
            <Image
              
              source={{uri:item.uri}}
              style={styles.image}
             
             />
             <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )
    }








  return (
    <View style={styles.main}>
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>nav()} style={styles.icon}>
            <Icon name='arrowleft' size={24} color='black'/>
        </TouchableOpacity>
      <TextInput value={filter} onChangeText={(text)=>handleSearch(text)} placeholder='Search' style={styles.search}  placeholderTextColor="black"></TextInput>
      
    </View>
    <FlatList data={categoryNames} renderItem={renderFunction} keyExtractor={(item, index) => index.toString()}/>
    <FlatList data={subCategoryNames} renderItem={rendersubFunction} keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
             
     
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
        borderWidth:0.5,
        marginTop:15,
        marginHorizontal:10,
        borderRadius:10,
        backgroundColor:'white'

    },
    search:
    {
           fontSize:20,
           color:'black',
           width:250
         
    },
    icon:
    {
        marginHorizontal:10
    },
    flatList:
    {
      height:55,
      borderWidth:0.9,
      borderRadius:8,
      marginHorizontal:10,
      marginTop:7,
      marginBottom:7,
      backgroundColor:'white',
      borderColor: '#9acd32',
      elevation: 5,
      flexDirection:'row',
      alignItems:'center',
      
     
    },
    text:
    {
      fontSize:20,
      color:'black',
      marginLeft:10
      
    },
    image:
    {
      height:48,
      width:48,
      borderRadius:5,
      marginHorizontal:5


    }
})