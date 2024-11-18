import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';



export default function AddressPage() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addresses, setAddresses] = useState([]);

  
  const addAddress = async() => {
    if (street.trim() && city.trim() && state.trim() && postalCode.trim()) {
      const newAddress = { street, city, state, postalCode };

      const token=await AsyncStorage.getItem('token')
      console.log(token);
      const data={
        token,
        street,
        city,
        state,
        postalCode
      }
    
     
      axios.post('http://192.168.1.244:5000/add-address',data)
      .then((res)=>
      {
        
           if(res.data.status=='ok')
           {

                Alert.alert(res.data.data)
                getData()
           }
          
        
      })
      .catch((err)=>
      {
        Alert.alert(err)
      })
  




      
      setStreet('');
      setCity('');
      setState('');
      setPostalCode('');
    }
  };
 

  async function getData()
  {

    try{

      
      const token= await AsyncStorage.getItem('token')
     // console.log(token)
   
      const res=await axios.get('http://192.168.1.244:5000/get-addresses',{params:{token}})
    
        if(res.data.status=='ok')
       {

          //console.log(res.data.data)
          const fetchedData=res.data.data;
          setAddresses(fetchedData);
           
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




























  const deleteAddress = async(id) => {


   
    try{

      
      const token= await AsyncStorage.getItem('token')
      console.log(token)
   
      const res=await axios.delete('http://192.168.1.244:5000/delete-address',{params:{token,addressId:id}})
    
        if(res.data.status=='ok')
       {

          Alert.alert(res.data.message);
          getData()
           
       }
       
        

    }
    catch(err)
    {
       Alert.alert("error: "+ err);
    }


  
   
  };

  




  const renderAddressItem = ({ item, index }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressText}>{item.street}</Text>
        <Text style={styles.addressText}>{item.city}, {item.state} - {item.postalCode}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteAddress(item._id)}>
        <Icons name="trash" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
      <View style={styles.header}>
        <Icon name="map-marker" size={58} color="#daa520" />
        <Text style={styles.headerText}>Add Address</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Street and Home No."
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={addAddress}>
          <Text style={styles.buttonText}>Add Address</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.addressList}
        showsVerticalScrollIndicator={false}
     
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#228b22',
    marginLeft: 10,
  },
  form: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#228b22',
    padding: 10,
    borderRadius: 8,
    fontSize: 20,
    color: 'black',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#228b22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  addressList: {
    marginTop: 20,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#228b22',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 19,
    color: 'black',
  },
});
