import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function FarmWallet() {
  
  const [balance, setBalance] = useState(0); // Initial balance


  const route= useRoute();
  const wallet=route.params.wallet




    
  useFocusEffect(
    React.useCallback(() => {
      setBalance(wallet)
    
      
    },[]),
  );
 

  
 
 
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

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 50,
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
