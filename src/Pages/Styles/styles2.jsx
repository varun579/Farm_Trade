import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f8ff',
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#4CAF50',
    },
    inputContainer: {
     
      marginBottom: 2,
      //justifyContent: 'space-between',
     // alignItems: 'center',
   
     height:50
  
    },
    box:
    {
      height:50,
      padding:2,
      flexDirection:'row',
      alignItems:'center',
      marginBottom:20
     
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
      fontSize: 20,
      color: 'black',
      width:'100%'
      
      
      
    
    },
    categoryContainer: {
      // flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: '#eeffcc',
      borderRadius: 5,
      marginBottom: 10,
      position:'relative',
     
    },
    categoryText: {
      fontSize: 18,
      color: 'black',
    },
    textInput:
    {
      borderWidth:0.5,
      height:40,
      width:280,
      marginTop:10,
      borderColor:'green'
    },
    buttonStyle: {
      // backgroundColor: '#f44336',
      padding: 5,
      borderRadius: 5,
      //height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    deleteText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: 'black',
    },
    textbox: {
      width: 200,
      
    },
    textbox1:
    {
      width: 300,
    

    },
    buttonBox: {
      height: 60,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems:'flex-end',
      //backgroundColor:'green'
    },
    subcategoryContainer: {
      padding: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginTop: 200,
      marginLeft:30,

      zIndex: 10, 
      elevation: 10,
      position:'absolute',
      shadowColor:'green'
    
     
    },
    subheading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#4CAF50',
      marginTop: 20,
    },
    subinput: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 20,
    },
    wrong: {
      marginLeft: 300,
    },
    container: {
      backgroundColor: 'white',
      padding: 16,
      flex:1
      
    },
    dropdown: {
      height: 50,
      width:'100%',
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      //backgroundColor:'red'
    },
    icon: {
      marginRight: 5,
      color:'black'
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    
    },
    selectedTextStyle: {
      fontSize: 16,
      color:'black'
    
    },
    iconStyle: {
      width: 20,
      height: 20,
      color:'black'
  
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:'black'
    },
  });

 export default styles;