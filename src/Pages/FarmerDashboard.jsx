import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FarmerDashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Farmer Dashboard</Text>
            <ScrollView style={styles.scrollContainer}>
                {/* Sales Overview Card */}
                <TouchableOpacity style={styles.card}>
                    <Ionicons name="cash" size={24} color="#fff" />
                    <Text style={styles.cardTitle}>Total Sales</Text>
                    <Text style={styles.cardValue}>$5,000</Text>
                </TouchableOpacity>

                {/* Products Overview Card */}
                <TouchableOpacity style={styles.card}>
                    <Ionicons name="pricetag" size={24} color="#fff" />
                    <Text style={styles.cardTitle}>Total Products</Text>
                    <Text style={styles.cardValue}>120</Text>
                </TouchableOpacity>

                {/* Inventory Overview Card */}
                <TouchableOpacity style={styles.card}>
                    <Ionicons name="grid" size={24} color="#fff" />
                    <Text style={styles.cardTitle}>Low Stock Products</Text>
                    <Text style={styles.cardValue}>5</Text>
                </TouchableOpacity>

                {/* Recent Orders Section */}
                <View style={styles.recentOrdersContainer}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>
                    {/* Replace with a map function to display actual order data */}
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Order #1234 - $50</Text>
                    </View>
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Order #1235 - $75</Text>
                    </View>
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Order #1236 - $30</Text>
                    </View>
                </View>
            </ScrollView>
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
    scrollContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    cardValue: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    recentOrdersContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    orderText: {
        fontSize: 16,
    },
});

export default FarmerDashboard;
