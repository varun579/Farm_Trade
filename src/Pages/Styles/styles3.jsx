import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    main: {
      height: 120,
      width: '95%',
      borderWidth: 0.9,
      marginHorizontal: 10,
      marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
       backgroundColor: 'white',
      borderRadius: 10,
      borderColor: '#9acd32',
      elevation: 10,
     
    },
    content: {
     justifyContent:'center',
     alignItems:'flex-start',
     width:150,
  
    
  
  
    },
    image: {
      height: 80,
      width: 80,
      borderRadius: 10,
      marginLeft: 10,
    },
    text: {
      fontSize: 22,
      fontWeight: '500',
      color: 'black',
      flexWrap: 'wrap',
    },
    butcontainer: {
      padding: 10,
      alignItems: 'center',
      
     
      
    },
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width:100,
      //  backgroundColor:'red',
      justifyContent:'space-evenly'
    },
    counterButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    counterButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    counterText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign:'center',
    
      width:22
      
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 17,
      color: 'black',
      fontWeight:'800'
    },
    paymentView:
    {
      borderWidth:0.5,
      height:130,
      marginHorizontal:10,
      marginBottom:10,
      borderRadius:10,
      backgroundColor: 'white',
      borderColor: '#9acd32',
      elevation: 5,
    },
    paymentText:{
      fontSize:18,
      color:'black',
      fontWeight:'400',
      marginHorizontal:10,
      marginBottom:10,
  
    },
    button:
    {
      height:50,
      backgroundColor: '#228b22',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
    },
    buttonText:
    {
      fontSize:21,
      fontWeight:'bold',
      color:'white'
  
    },
    cartContainer:
    {
      height:250,
      backgroundColor:'white',
      margin:15,
      borderRadius:10,
      borderWidth:1,
      borderColor:'white',
      justifyContent:'center',
      alignItems:'center'
  
    },
    cartButton:
    {
      height:40,
      width:240,
      backgroundColor:'black',
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    },
    textCart:
    {
      color:'white',
      fontSize: 16,
      fontWeight:'800',
      
    },
    insideContainer:
    {
       justifyContent:'space-around',
       alignItems:'center',
       height:220,
      
    },
    icon:
    {
      backgroundColor:'#f2f2f2',
      height:110,
      width:110,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    payButton: {
      backgroundColor: '#228b22',
      padding: 15,
      borderRadius: 10,
    },
    payButtonText: {
      color: 'white',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color:'black'
    },
    balanceText: {
      fontSize: 16,
      marginBottom: 10,
      color:'black'
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      padding: 10,
      width: '100%',
      marginBottom: 20,
      textAlign: 'center',
      color:'black'
      
    },
    confirmButton: {
      backgroundColor: '#228b22',
      padding: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 16,
    },
    cancelButton: {
      padding: 8,
      
    },
    cancelButtonText: {
      color: '#228b22',
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginRight:10
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:'center'
    },
    delBox:
    {
      height:100,
   
      justifyContent:'space-evenly'
    },
















  //   centeredView: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
      
  // },
  // modalContainer: {
  //     backgroundColor: 'white',
  //     borderRadius: 10,
  //     width: 380,
  //     alignItems: 'center',
  //     justifyContent:'space-between',
  //     height:300,
  //     // borderColor:'red',
  //     // borderWidth:2,
  //     padding:10
  // },
  // modalTitle: {

  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  //   color:'black'
  // },
  // addressItem: {
  //     padding: 5,
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     borderRadius: 5,
  //     marginBottom: 10,
  //     width:"100%"
  // },
  // selectedAddress: {
  //     borderColor: 'blue',
  // },

  // confirmButton: {
  //   backgroundColor: '#228b22',
  //   padding: 15,
  //   borderRadius: 8,
  //   width: '80%',
  //   alignItems: 'center',
  //   marginTop:20
  //  // marginBottom: 10,
  // },
  // confirmButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
  // cancelButton: {
  //   padding: 5,
    
  // },
  // cancelButtonText: {
  //   color: '#228b22',
  //   fontSize: 16,
  // },
  // balanceText: {
  //   fontSize: 18,
  //   marginBottom: 5,
  //   color:'black'
  // },
  
  });

export default styles