import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,TextInput } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import images from '../../../assets/SubCategory.json'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { CommonActions } from '@react-navigation/native';
import styles from '../../Styles/styles3';




export default function Cart() {
  const [quantities, setQuantities] = useState({});
  const [cartList,setCartList] =useState([]);
  const [total,setTotal]=useState(0);
  const [length,setLength]=useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');



  // Toggle modal visibility
  const toggleModal = () => setModalVisible(!isModalVisible);

  // Handle payment
  const handlePayment = async() => {
    const amount = parseFloat(total);
 

    if (amount > walletBalance) {
      Alert.alert('Insufficient Balance', 'Your wallet balance is insufficient for this transaction.');
      return;
    }

    
    //setWalletBalance(walletBalance - amount);
    getUserDetails();
   // Alert.alert('Payment Successful', `You paid ${amount} Rs from your wallet.`);



   


    try{


      const token= await AsyncStorage.getItem('token')



    const cartData =
    {
       cartdata:cartList,
       token:token,
       amount
    }

   
      const res=await axios.post('http://192.168.1.244:5000/update-data',cartData)
       console.log(res.status)
        if(res.data.status==200)
       {
    
        Alert.alert(`${res.data.message}, Available balance: ${res.data.remainingBalance}`)

        setPaymentAmount('');
        setCartList([])
        setLength(0)
        toggleModal(); 
                
           
       }
       else if(res.data.status===400)
       {
         
        Alert.alert(res.data.message);


       }
        

    }
    catch(err)
    {
     
       //console.log(err.message)
       Alert.alert("error: "+ err);
    }

    










    











  };








  
 
  
  const navigation = useNavigation();


  async function  getUserDetails() {



    const token = await AsyncStorage.getItem('token');
      console.log(token);
    axios
      .get('http://192.168.1.244:5000/userdata', {params:{token:token}})
      .then(res => {
      //  console.log(res.data);
     

        if(res.data.wallet==null)
        {
          setWalletBalance(0)
        }
        else
        {
          setWalletBalance(res.data.wallet.
            walletBalance)
        }
      
        



      });
  }









  async function getData()
  {

    try{


      const token= await AsyncStorage.getItem('token')
   
      const res=await axios.get('http://192.168.1.244:5000/get-cartdetails',{params:{token}})
      //  console.log(res.data.data)
    
        if(res.data.status=='ok')
       {

          const datalist = [];
          let money = 0;
          
         
           
          
         

            (res.data.data).forEach((item) => {
             
                const subCategory = item.product_id.categoryId.name;
                const products = images[subCategory];
               
             
               

                
                products.forEach((product) => {
                    if (item.product_id.subname === product.name && item.product_id.quantity>0) {

                       money += item.price;
                        const updatedItem = {
                            ...item,
                            uri: product.uri,
                        };
                        //console.log(updatedItem)
                        datalist.push(updatedItem);
                    }
                });
               
               
            });
         
           
            //console.log(datalist)
            setTotal(money);  
            setLength(datalist.length); 
            setCartList(datalist);
            
           
         }
        

    }
    catch(err)
    {
      console.log("hi")
       Alert.alert("error: "+ err);
    }

    
      
    
  }


    
  const handleQuantity = async(id,price,symbol)=>
    {
      const token= await AsyncStorage.getItem('token')
      
      

   //  console.log(symbol);
      
      const data={
  
        token:token,
        productId:id,
        quantity:1,
        price:price,
        symbol:symbol
  
  
  
  
      }
  
  
     
      axios.post('http://192.168.1.244:5000/update-cart',data)
      .then((res)=>
      {{total}
        
           if(res.data.status=='ok')
           {

              getData();
            
              Alert.alert(res.data.data)
           }
          
        
      })
      .catch((err)=>
      {
        Alert.alert(err)
      })
  
  
  
     }
  
  

  


   // useEffect(() => {
  //   setSubCategory(Object.values(subImages).flat());
  // }, []);





  
      
  useFocusEffect(
    React.useCallback(() => {
      getData();
      getUserDetails();
    
      
    },[]),
  );

    
    



  const renderFunction = ({ item }) => {
  
    return (
      <View style={styles.main}>
        <View style={styles.imageView}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>{item.product_id.subname}</Text>
          <Text style={{ fontSize: 17, color: 'black' }}>Farmer: {item.product_id.userId.name} </Text>
          <Text style={{ fontSize: 17, color: 'black' }}>Price: {item.price} Rs</Text>
        </View>


        {
          
              item.product_id.quantity>=1 ? 

            
                <View style={styles.butcontainer}>
                <View style={styles.counterContainer}>

                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => handleQuantity(item.product_id._id,item.product_id.price,'-')}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.counterText}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => handleQuantity(item.product_id._id,item.product_id.price,'+')}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>


            :
            
             <View style={styles.delBox}>
            <TouchableOpacity style={[styles.addButton,{backgroundColor:'#ff4d4d'}]} >
            <Text style={styles.addButtonText}>Out of Stock</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.addButton,{backgroundColor:'#ff4d4d'}]} 
             onPress={() => handleQuantity(item.product_id._id,item.product_id.price,'-')}
            >
            <Text style={styles.addButtonText}>Remove</Text>
            </TouchableOpacity>
            </View>
            
            }


      </View>
    );
  };

  return (
  

    <View style={{backgroundColor:'#f2f2f2',flex:1}}>
    <FlatList
      data={cartList}
      renderItem={renderFunction}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={

      <View style={styles.cartContainer}>

      <View style={styles.insideContainer}>
        <View style={styles.icon}>
         <Icon name='bag-add' size={75}/>
        </View>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
        onPress={() => {
        navigation.dispatch(
        CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeStack' }], 
      })
      );
     }}
     style={styles.cartButton}
      >
     <Text style={styles.textCart}>Browse Products</Text>
     </TouchableOpacity>

        </View>

    </View>
       
      }
      contentContainerStyle={{ paddingBottom: 550 }}
      showsVerticalScrollIndicator={false}
    />
    {
     length ===0 ? null :  <View style={styles.paymentView}>
      <Text style={[styles.paymentText,{fontSize:20,fontWeight:'600'}]}>Payment details</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between',height:40,alignItems:'center'}}>
        <Text style={styles.paymentText}>Total Price</Text>
        <Text style={styles.paymentText}>{total} Rs</Text>
      </View>
      <TouchableOpacity style={styles.button}  onPress={toggleModal}>
        <Text style={styles.buttonText}>Order now</Text>
      </TouchableOpacity>

    </View>

    }

    
    {
           <View style={styles.container}>
           
           {/* Modal for payment */}
           <Modal visible={isModalVisible} transparent animationType='slide'>
             <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                 <Text style={styles.modalTitle}>Wallet Payment</Text>
                 <Text style={styles.balanceText}>Wallet Balance: {walletBalance.toFixed(2)}</Text>

                 <View style={{flexDirection:'row',justifyContent:'space-between',height:40,alignItems:'center'}}>
                    <Text style={styles.balanceText}>Total Price: </Text>
                    <Text style={styles.balanceText}>{total} Rs</Text>
                 </View>
               
     
                 <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
                   <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                   <Text style={styles.cancelButtonText}>Cancel</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </Modal>
         </View>

    }
    </View>
   
    
  );
}

