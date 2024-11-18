import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Manage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
        
        const product = {
            id: products.length + 1,
            ...newProduct,
        };
        
        setProducts([...products, product]);
        setNewProduct({ name: '', price: '', quantity: '' }); // Reset fields
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name} - ${item.price} (Qty: {item.quantity})</Text>
            <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Products</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Price"
                    value={newProduct.price}
                    onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChangeText={(text) => setNewProduct({ ...newProduct, quantity: text })}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Product</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    list: {
        marginTop: 20,
    },
    productItem: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 5,
    },
});

export default Manage;
