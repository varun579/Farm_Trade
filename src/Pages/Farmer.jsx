import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function Farmer() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddItem = () => {
    // Handle item submission logic here
    console.log({
      category,
      subcategory,
      price,
      quantity,
      amount
    });
    // Reset form after submission
    setCategory('');
    setSubcategory('');
    setPrice('');
    setQuantity('');
    setAmount('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Item for Sale</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Subcategory"
        value={subcategory}
        onChangeText={setSubcategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Item" onPress={handleAddItem} color={'#228b22'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
  },
});
