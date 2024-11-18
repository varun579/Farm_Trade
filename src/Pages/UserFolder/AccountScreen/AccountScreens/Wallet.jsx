import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';











export default function WalletPage() {
 
  const [balance, setBalance] = useState(0); 
  const [inputValue, setInputValue] = useState(''); 

  const route= useRoute();
  const wallet=route.params.wallet




    
  useFocusEffect(
    React.useCallback(() => {
      setBalance(wallet)
    
      
    },[]),
  );
 








  
  const addBalance = async() => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount');
      return;
    }
    setBalance(balance + amount);
    setInputValue('');
   
   const token= await AsyncStorage.getItem('token')

  // console.log(token)

   const data={
    token:token,
    balance:amount
   }

   axios.post('http://192.168.1.244:5000/add-balance',data)
    .then((res)=>
    {
      
         if(res.data.status=='ok')
         {
          //  console.log(res.data.data)
           Alert.alert(res.data.message)
         }
        
      
    })
    .catch((err)=>
    {
       Alert.alert(err)
    })


















  };

 
  // const editBalance = () => {
  //   const newAmount = parseFloat(inputValue);
  //   if (isNaN(newAmount) || newAmount < 0) {
  //     Alert.alert('Invalid Input', 'Please enter a valid amount');
  //     return;
  //   }
  //   setBalance(newAmount);
  //   setInputValue('');


 // };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="wallet" size={58} color="#daa520" />
        <Text style={styles.headerText}>My Wallet</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Current Balance</Text>
        <Text style={styles.balanceAmount}>₹ {balance.toFixed(2)}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <TouchableOpacity style={styles.button} onPress={addBalance}>
        <Text style={styles.buttonText}>Add Balance</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={[styles.button, styles.editButton]} onPress={editBalance}>
        <Text style={styles.buttonText}>Edit Balance</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#228b22',
    marginLeft: 10,
  },
  balanceContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceText: {
    fontSize: 18,
    color: '#555',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '600',
    color: '#228b22',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#228b22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#daa520',
  },
});
