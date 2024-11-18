import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';

const AddressModal = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
    const [isAddressModalVisible, setAddressModalVisible] = useState(false);

    const addresses = [
        {
            street: "7-75, Sardhar Vallabhai Patel Road",
            city: "Nallabelly",
            state: "Telangana",
            postalCode: "506349",
            _id: '6729cbec5cd28317315a7c1'
        },
        {
          street: "7-75, Sardhar Vallabhai Patel Road",
          city: "Nallabelly",
          state: "Telangana",
          postalCode: "506349",
          _id: '6729cbec5cd28317315a7c'
      },
      {
        street: "7-75, Sardhar Vallabhai Patel Road",
        city: "Nallabelly",
        state: "Telangana",
        postalCode: "506349",
        _id: '6729cbe5cd28317315a7c1'
    },
    {
      street: "7-75, Sardhar Vallabhai Patel Road",
      city: "Nallabelly",
      state: "Telangana",
      postalCode: "506349",
      _id: '6729cbec5cd2837315a7c'
     },
     {
      street: "7-75, Sardhar Vallabhai Patel Road",
      city: "Nallabelly",
      state: "Telangana",
      postalCode: "506349",
      _id: '6729cbec5cd2837315a7c1'
  },
  {
    street: "7-75, Sardhar Vallabhai Patel Road",
    city: "Nallabelly",
    state: "Telangana",
    postalCode: "506349",
    _id: '6729cbeccd28317315a7c'
},
{
  street: "7-75, Sardhar Vallabhai Patel Road",
  city: "Nallabelly",
  state: "Telangana",
  postalCode: "506349",
  _id: '6729cbe5cd28317315a71'
},
{
street: "7-75, Sardhar Vallabhai Patel Road",
city: "Nallabelly",
state: "Telangana",
postalCode: "506349",
_id: '729cbec5cd28317315a7c'
},
        // Add more address objects if needed
    ];

    const handleAddressSelect = (addressId) => {
        setSelectedAddress({ addressId });
    };

    const handleProceedToPayment = () => {
        setAddressModalVisible(false); // Close Address Modal
        setPaymentModalVisible(true);  // Open Payment Modal
    };

    const handleCancel = () => {
        setAddressModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Address Selection Modal */}
            <Modal visible={!isAddressModalVisible} transparent={true} animationType="slide">
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Address</Text>
                        
                        <FlatList
                            data={addresses}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.addressItem,
                                        selectedAddress?.addressId === item._id && styles.selectedAddress
                                    ]}
                                    onPress={() => handleAddressSelect(item._id)}
                                >
                                    <Text style={styles.balanceText}>{item.street}</Text>
                                    <Text style={styles.balanceText}>{item.city}, {item.state}</Text>
                                    <Text style={styles.balanceText}>{item.postalCode}</Text>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                           // style={{marginBottom:50,height:90,borderColor:'red',borderWidth:1}}
                       
                          
                        />

                        

                 <TouchableOpacity style={styles.confirmButton} onPress={handleProceedToPayment} disabled={!selectedAddress}>
                   <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                   <Text style={styles.cancelButtonText}>Cancel</Text>
                 </TouchableOpacity>





                        
                      

                
                    </View>
                </View>
            </Modal>

            {/* Payment Modal */}
            <Modal visible={isPaymentModalVisible} transparent={true} animationType="slide">
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Wallet Payment</Text>
                        <Text>Proceeding with Address ID: {selectedAddress?.addressId}</Text>
                        <Text style={styles.balanceText}>Wallet Balance: 1000 Rs</Text>
                        <Text style={styles.balanceText}>Total Price: 500 Rs</Text>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => {/* Handle payment logic */}}>
                            <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setPaymentModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddressModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 400,
        alignItems: 'center',
        justifyContent:'space-between',
        height:400,
        // borderColor:'red',
        // borderWidth:2,
        padding:10
    },
    modalTitle: {

      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color:'black'
    },
    addressItem: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        width:"100%"
    },
    selectedAddress: {
        borderColor: 'blue',
    },

    confirmButton: {
      backgroundColor: '#228b22',
      padding: 15,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
      marginTop:20
     // marginBottom: 10,
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 16,
    },
    cancelButton: {
      padding: 5,
      
    },
    cancelButtonText: {
      color: '#228b22',
      fontSize: 16,
    },
    balanceText: {
      fontSize: 18,
      marginBottom: 5,
      color:'black'
    },
});
